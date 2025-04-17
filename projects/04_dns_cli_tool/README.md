# 📘 Project 04 – DNS CLI Tool (Go)

A fast, portable command-line tool written in Go to create, update, and delete DNS A records using a provider API (Cloudflare, Route53, or local Bind).

This project is a reimagining of Project 01 — but compiled, testable, and Go-native. It marks a shift toward production-grade tooling and performance-first design.

---

## 🧭 Overview

While Python is great for prototyping, Go is ideal for DevOps and infrastructure automation. This CLI tool:

- Performs the same DNS operations as the Python script (add/remove/validate A records)
- Interacts with DNS APIs (Cloudflare, Route53, or Bind)
- Provides a fast, compiled binary that’s easily distributed
- Introduces Go idioms, CLI frameworks, and error handling practices

This tool will later plug into GitOps pipelines, exporters, or real-world deployments.

---

## 🛠 Tech Stack

- Go (v1.21+)
- Cobra or urfave/cli for CLI interface
- net/http or SDK (Cloudflare-go, AWS SDK)
- Viper for config handling (optional)
- logrus or zap for logging

---

## 🎯 Goals

- Build your first real Go CLI app
- Learn CLI design patterns (flags, subcommands, validation)
- Translate earlier Python logic into Go idioms
- Practice packaging, releasing, and testing a binary

---

## 🚀 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/projects/04_dns_cli_tool
```

2. Install Go and build:

```bash
go build -o dnscli main.go
```

3. Run the tool:

```bash
./dnscli add --hostname dev.packet-guide.com --ip 10.0.0.5
./dnscli delete --hostname dev.packet-guide.com
```

---

## ⚙️ Features

- ✅ Add A record
- ✅ Delete A record
- 🔄 Validate existing records (A → IP)
- 🔐 Configurable provider (via ENV or config file)
- 📦 Packaged as a binary for Linux/macOS/Windows

---

## 📂 Project Structure

```
main.go                # Entry point
cmd/
├── root.go            # CLI root command
├── add.go             # 'add' subcommand
└── delete.go          # 'delete' subcommand
pkg/
└── provider/          # Cloudflare, Route53, Bind logic
config.yaml            # Optional for tokens/zones
README.md              # You're here
```

---

## 🧠 What I Learned

To update while building:

- CLI design patterns in Go (flags, commands, config)
- Interacting with APIs using Go SDKs
- Error handling, retries, JSON parsing
- Compiling and distributing binaries

---

## 🧪 Example

```bash
./dnscli add --hostname staging.packet-guide.com --ip 172.20.10.50
```

Console Output:

```
✅ A record created: staging.packet-guide.com → 172.20.10.50
```

---

## 🔁 Next Steps

- Add support for CNAMEs
- Add unit tests for command execution
- CI pipeline for Go build + test
- Add `--dry-run` and `--provider` flags

---

## ✍️ Related Blog Ideas

- “My First Go CLI Tool: Building a DNS Record Manager”
- “From Python to Go: Why I Rewrote My DNS Script”
- “Designing Developer-First Infrastructure Tools”
