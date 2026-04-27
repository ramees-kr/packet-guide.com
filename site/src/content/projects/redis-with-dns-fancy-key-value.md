---
title: "I Thought Redis Was Just a Fancy Key-Value Store, Until I Built a DNS Cache Dashboard"
date: "2025-10-21"
description: "Building an interactive DNS caching dashboard with Python, Flask, and Redis to learn different Redis data structures like Hashes, Strings, Lists, and Sorted Sets."
tags:
  - Python
  - Flask
  - Redis
  - DNS
  - Caching
  - DevOps
repoUrl: "https://github.com/ramees-kr/redis-with-dns"
demoUrl: "https://redis-with-dns.onrender.com"
---

## The “Wait, Redis Can Do That?” Moment

I’ve always learned best by building something real.

Recently, while going through the excellent Redis University caching path, I had that thought every engineer gets after finishing a course:
“Okay, cool! now what?”

I was about to start Redis for Python Developers, but then it hit me: I already troubleshoot DNS and DHCP issues at work every day.

What better way to learn Redis than to build a DNS cache! So that’s what I did.

---

## From “Hello Redis” to a Working DNS Cache

The goal was simple: I wanted a small project that demonstrates how caching actually feels in action, not in theory. Something you can click, test, and see the benefit instantly.

**Check it out here:** [redis-with-dns.onrender.com](https://redis-with-dns.onrender.com)

_(Heads up: it’s on Render’s free tier, so it might nap a bit before waking up.)_

When it loads, you’ll see a plain, minimal DNS Lookup tool.

![Redis DNS Dashboard Screenshot](/images/projects/21102025-redis-with-dns.jpeg)

You can query any domain (`A`, `MX`, `NS`, `TXT`) — try `www.redis.io`.
Look closely at:

- **TTL** – how long this record stays valid.
- **Lookup Time** – the first time will be from Live DNS, a bit slower.

Run the same query again! **boom!!** now it’s from cache. You’ll see the speed difference right away.
That’s Redis magic in real life.

(And yes, the backend Redis DB is currently hosted on Redis Cloud, so there’s a bit of internet round-trip latency. If you run it locally with Docker, you’ll get those sub-2ms cached responses that make you grin.)

---

## What’s Happening Under the Hood

I wanted to push Redis a bit and use more than just plain GET and SET. Here’s what I ended up with:

| Use Case           | Redis Data Structure  | Why It Fits                                                                       |
| :----------------- | :-------------------- | :-------------------------------------------------------------------------------- |
| Successful lookups | **Hash**              | Store domain, record type, TTL, and result together. Perfect for structured data. |
| NXDOMAIN/Failures  | **String**            | Negative caching, skip repeated lookups for nonexistent domains.                  |
| Recent queries     | **List**              | A rolling log of the last 10 queries, updated in O(1).                            |
| Popular domains    | **Sorted Set (ZSET)** | Automatic leaderboard, each query bumps a domain’s score.                         |

That last one’s my favorite. Every time someone makes a query, Redis runs:

```python
r.zincrby("dns:popularity", 1, domain_name)
```

and just like that, the Top 10 leaderboard updates itself.

No cron jobs, no SQL joins, no fuss.

---

## Things I Didn’t Expect to Learn

This little weekend project ended up teaching me more than any course alone could:

- **Negative caching isn’t just theory** : it’s what saves your recursive resolvers in the real world.
- **TTL-awareness in Redis** is fun when you dynamically assign expiries from DNS responses.
- **`SCAN` \> `KEYS`**. Once you hit a few hundred cached keys, `scan_iter()` becomes your best friend.
- **Atomic ops are addictive**. `ZINCRBY`, `HSET`, and `EXPIRE` in one go make you appreciate Redis’ simplicity.
- And most of all, seeing **latency drop from 150ms to 2ms** on a repeated query is oddly wow.

---

## Final Thoughts

I started this to learn Redis. I ended up with a working demo that shows, visually, how caching actually changes everything.

No Kubernetes, no distributed systems talk, just a simple Python + Flask app showing how fast in-memory data can be.

If you’re learning Redis, or if you’ve ever debugged a DNS issue and wondered how caching really works, give this a try.

You can find the code here → [github.com/ramees-kr/redis-with-dns](https://github.com/ramees-kr/redis-with-dns)

Happy caching\!
