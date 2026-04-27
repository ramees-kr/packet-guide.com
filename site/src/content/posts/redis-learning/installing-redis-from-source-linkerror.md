---
title: "When Redis 5.0 Refused to Build — and How I Fixed the Linker Error"
date: "2025-09-28"
excerpt: "I needed to build Redis 5.0 on Ubuntu 22.04, hit a baffling multiple-definition linker error, and fixed it by converting a header-side definition into a proper extern declaration. Here’s the step-by-step diagnosis and the simple patch that saved the day."
author: "Packet Pilot"
tags:
  - Redis
  - Linux
  - Debugging
  - C
  - Build
---

I set out to build Redis 5.0 on an Ubuntu 22.04 machine. It should have been straightforward: download the source, install the build deps, run `make`, and go. Instead, the build crashed with a linker error complaining about `SDS_NOINIT` being defined multiple times.

This post walks through what happened, why the linker complained, the minimal fix I applied (and why it’s correct), and a few practical takeaways so you don’t waste time on the same trap.

## Quick context : the environment and intent

I was using Ubuntu 22.04 (WSL) and needed Redis 5.0 for a compatibility reason. The distro apt repository and the upstream packages repo no longer had 5.0, so I downloaded the source from the Redis releases page and followed the official build steps.

System snapshot:

```
PRETTY_NAME="Ubuntu 22.04.5 LTS"
VERSION_ID="22.04"
```

I installed the usual build tools and dependencies (gcc, make, cmake, python3, etc.), downloaded the tarball, and ran the build.

## The build failure (the error)

The build started fine, but `make` failed near the link step. Here’s the exact error I got:

```
/usr/bin/ld: defrag.o:/root/redis-5.0.0/src/sds.h:37: multiple definition of `SDS_NOINIT';
    quicklist.o:/root/redis-5.0.0/src/sds.h:37: first defined here
/usr/bin/ld: t_stream.o:/root/redis-5.0.0/src/sds.h:37: multiple definition of `SDS_NOINIT';
    quicklist.o:/root/redis-5.0.0/src/sds.h:37: first defined here
...
collect2: error: ld returned 1 exit status
make[1]: *** [Makefile:199: redis-server] Error 1
```

Two important things to note from this message:

- The symbol `SDS_NOINIT` was found in multiple object files.
- The symbol reference points back to `sds.h` : a header included in many `.c` files.

If you’ve seen this kind of "multiple definition" error before, you know it almost always means that a header file contains a definition (storage allocation) instead of a declaration.

## Root cause : a header accidentally defining storage

I inspected `src/sds.h` and found the line:

```c
const char *SDS_NOINIT;
```

That is not a declaration only , it is a definition. When a header containing that line is included in multiple translation units (multiple `.c` files), each translation unit gets its own copy of that symbol. During linking, the linker finds many definitions of the same symbol and fails.

The correct pattern in C is:

- Header files (.h) should contain **declarations** , telling the compiler a symbol exists somewhere else.
- Exactly one source file (.c) should contain the **definition** , creating the storage.

In this codebase the _actual_ storage and initializer already belong in `sds.c`:

```c
/* in sds.c */
const char *SDS_NOINIT = "SDS_NOINIT";
```

So the header should only declare the symbol, not define it.

## The minimal and correct fix

I tracked the exact fix down to an upstream GitHub discussion: [https://github.com/redis/redis/issues/6810](https://github.com/redis/redis/issues/6810). That issue documents the same linker error (`multiple definition of 'SDS_NOINIT'`) and confirms the root cause: a header file (`sds.h`) contained a definition rather than a declaration, which caused every `.o` file that included the header to provide its own copy of the symbol.

The tidy, accepted approach is to make the header _declare_ the symbol and let a single source file provide the _definition_. Concretely:

- Problem (in `src/sds.h`):

```c
/* BAD: this creates storage in every .o that includes sds.h */
const char *SDS_NOINIT;
```

- Correct pattern (change to `extern` in the header):

```c
/* GOOD: declaration only — storage is defined once elsewhere (sds.c) */
extern const char *SDS_NOINIT;
```

- And in `src/sds.c` the single defining line remains:

```c
/* single definition with initializer */
const char *SDS_NOINIT = "SDS_NOINIT";
```

That tiny `extern` change prevents multiple storage allocations and fixes the linker failure. The upstream issue includes discussion and confirmation of this diagnosis; linking to it makes the post auditable and gives readers a pointer if they want the deeper context.

## Verification

After applying the header change:

1. Run the build:

```bash
make -j"$(nproc)" all
```

2. Confirm `redis-server` was built:

```bash
src/redis-server --version
# or
which redis-server
```

3. Run a smoke test:

```bash
src/redis-server --port 6380 --daemonize yes
src/redis-cli -p 6380 ping
# Expected output: PONG
```

If you see `PONG`, the server is up and the build is valid.

## Notes on why this happens and how to avoid it

- This is a classic C mistake: putting a definition in a header. It happens more often than you’d expect, especially in older codebases or when someone refactors quickly.
- The symptom (multiple definition at link time) is typically easy to diagnose: the linker tells you which symbol and the files that caused it.
- When debugging, search for every occurrence of the symbol and confirm where the initializer lives.

## Practical takeaways

1. **If you control the code, prefer the `extern` declaration in headers** and the single definition in one source file.
2. **When building older code on modern systems**, be ready for small portability/build issues; the fix is often straightforward but requires reading the compile/linker errors carefully.
3. **Use a container if reproducibility matters.** If you need to support an old runtime or old toolchain, build inside a Docker container (or VM) pinned to a known image , that avoids environment drift and makes the build reproducible for others.
4. **Keep a short troubleshooting log.** When you fix a build issue, note the exact error and the minimal patch. That makes it faster the next time (and helpful for teammates).
5. **If you’re packaging for production**, consider whether you should backport fixes upstream. For open-source projects, a small pull request that changes a header to `extern` is usually welcome.

## Final words

That small `extern` change saved a lot of time. The error looked scary when it first appeared , multiple object files, linker stack , but the root cause turned out to be a simple C rule applied slightly wrong.

If you found this useful, save the snippet , linker errors are unhelpful when you’re under pressure, but with the right read of the message they’ll point straight to the fix.
