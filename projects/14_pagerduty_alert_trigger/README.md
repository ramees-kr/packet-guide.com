# 📘 Project 14 – PagerDuty Alert Trigger (Go)

A Go-based service that listens for specific infra events (e.g. DHCP floods, unknown MACs, DNS record failures) and sends alerts to PagerDuty using the Events API v2.

This is your first “event-to-alert” bridge — turning observed infrastructure anomalies into actionable incidents.

---

## 🧭 Overview

You're now monitoring DHCP leases, DNS mismatches, and system health. The next step is to alert when thresholds or patterns are breached.

This service acts as:

- An alert bridge from your Kafka topic or JSON file
- A parser and filter (e.g. “only alert for MAC not in whitelist”)
- A PagerDuty Events API v2 sender

Use case:

- Watch Kafka topic for DHCP events
- If lease is issued to rogue MAC → send PagerDuty alert
- Or, if too many DNS mismatches in 1 minute → fire alert

---

## 🛠 Tech Stack

- Go (1.21+)
- goroutines + channels + filtering
- PagerDuty Events API v2
- REST/JSON encoding
- Kafka-go (or file watch fallback)
- Optional:
  - SQLite / JSON / map-based whitelist

---

## 🎯 Goals

- Learn how to send alerts to a real incident response platform
- Filter and batch events to avoid alert fatigue
- Track incident deduplication using PagerDuty's incident_key
- Log alert attempts and handle error responses

---

## 🚀 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/projects/14_pagerduty_alert_trigger
```

2. Set up environment variables:

```bash
export PAGERDUTY_ROUTING_KEY="your_v2_integration_key"
```

3. Build and run:

```bash
go build -o pd_trigger main.go
./pd_trigger --watch ./events/dhcp.json
```

---

## 📂 Project Structure

```
main.go                      # CLI + event watcher
cmd/
└── trigger.go               # Alert filtering + API sender
pkg/
├── filters/                 # Match rules (mac, count, ttl)
├── pagerduty/               # PD API logic
events/
└── dhcp.json                # Simulated event feed
configs/
└── alert-rules.yaml         # MACs, thresholds, cooldowns
README.md
```

---

## ⚙️ Alert Format

📤 JSON Sent to PagerDuty:

```json
{
  "routing_key": "xxxx",
  "event_action": "trigger",
  "dedup_key": "mac-00-11-22-33",
  "payload": {
    "summary": "DHCP alert: Unknown MAC 00:11:22:33",
    "severity": "critical",
    "source": "dhcp_watcher",
    "timestamp": "2025-02-20T12:12:00Z"
  }
}
```

📥 Response:

```json
{
  "status": "success",
  "message": "Event processed",
  "dedup_key": "mac-00-11-22-33"
}
```

---

## 🧠 What I Learned

To reflect as you build:

- PagerDuty’s Events API and deduplication logic
- How to format and validate alerts before sending
- Alert tuning: frequency, scope, importance
- Observability → Actionable response

---

## 🔁 Next Steps

- Support Kafka input stream for live alerts
- Add Prometheus-style alert rules (count, rate, time window)
- Add exponential backoff and error retries
- Add structured logging and alert history

---

## ✍️ Related Blog Ideas

- “Building a Custom Alert Trigger for PagerDuty in Go”
- “When a DHCP Lease Goes Rogue, PagerDuty Calls Me”
- “From Infrastructure Logs to Incidents: My First Alert Bridge”

---

## 🛡️ Notes on Safety

- Always test with a test PagerDuty service
- Use low-urgency or email targets until you’re confident
- Rate-limit alert attempts to avoid incident spam
