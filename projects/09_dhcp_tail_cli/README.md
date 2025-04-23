# 📘 Project 09 – DHCP Tail CLI Tool (Go)

A Go-based command-line tool that “tails” DHCP server logs in real time and prints lease events as structured output. Think: a network-`tail` + filter for DevOps engineers.

This project builds on Projects 02 and 06, but now it's fast, event-driven, and scalable.

---

## 🧭 Overview

Tailing logs is one of the simplest and most powerful tools in your DevOps toolbox. This project creates a log tailer that:

- Watches a DHCP log file (e.g. `/var/log/kea/kea-dhcp4.log` or similar for Kea)
- Follows it as new lines appear (like `tail -f`)
- Detects new DHCP leases (IP/MAC/hostname)
- Optionally filters output by MAC address or device tag
- Outputs structured events (to console, JSON, or Kafka later)

Written in Go for speed, concurrency, and future extensibility.

---

## 🛠 Tech Stack

- Go (1.21+)
- `bufio`, `os`, `regexp`, `time`, `encoding/json` (for Kea logs)
- `cobra` (CLI flags)
- `logrus` or `zerolog` (structured logging)
- Optional: Kafka producer (later phase)

---

## 🎯 Goals

- Build your first file tailer in Go
- Parse lines/events as they’re written (watch mode)
- Match DHCP lease information (potentially using JSON parsing for Kea logs)
- Print out lease events in real-time
- Prepare for event pipelines (Phase 3 Kafka)

---

## 🚀 Getting Started

1.  Clone the repo:
    ```bash
    git clone https://github.com/your-username/packet-guide.com.git
    cd packet-guide.com/projects/08_dhcp_tail_cli
    ```
2.  Build the tool:
    ```bash
    go build -o dhcptail main.go
    ```
3.  Run it (adjust path for Kea logs):

    ```bash
    # Example for Kea logs
    ./dhcptail --file /var/log/kea/kea-dhcp4.log --format json

    # Or simulate from a test log file
    ./dhcptail --file examples/kea-test.log --format json
    ```

---

## ⚙️ Features

- ✅ Tail log files like `tail -f`
- ✅ Parse DHCP lease entries (IP, MAC, Hostname, Timestamp) - potentially via JSON for Kea
- ✅ Filter by MAC address (`--mac aa:bb:cc:dd:ee:ff`)
- ✅ Print in JSON or colorized text
- 🛠 Optional: Send events to Kafka (Phase 3)

---

## 🧪 Sample Output

Terminal (Colorized Text):

```
📡 New Lease: laptop-01 (192.168.1.44)
MAC: 00:11:22:33:44:55
Time: 2025-08-14 13:02:21
```

Or JSON (Closer to Kea's potential log structure):

```json
{
  "hostname": "laptop-01",
  "ip": "192.168.1.44",
  "mac": "00:11:22:33:44:55",
  "timestamp": "2025-08-14T13:02:21Z",
  "event_type": "DHCP4_LEASE_ALLOC"
}
```

_(Note: The exact JSON structure depends on Kea's logging configuration.)_

---

## 📂 Project Structure

```
main.go
cmd/
├── root.go
└── watch.go            # core logic for tailing + parsing
pkg/
└── parser/             # DHCP log parsing logic (text regex or JSON)
examples/
└── kea-test.log        # Simulated Kea DHCP logs (JSON or text)
README.md
```

---

## 🧠 What I Learned

- How to use Go to watch file changes
- Parsing streaming data (text regex or JSON) in real time
- Building structured logs/events from log lines
- CLI ergonomics and UX for DevOps tools

---

## 🔁 Next Steps

- Add Kafka output support
- Add log rotation handling (tail from last N lines)
- Integrate with Project 06 (alerts)
- Export metrics from tailer (Phase 3)

---

## ✍️ Related Blog Ideas

- “Building a Real-Time DHCP Tailer in Go”
- “From Log Files to Live Events: A DevOps Streamer”
- “Go is Great for Infra Tools: Here’s My DHCP Monitor”

---
