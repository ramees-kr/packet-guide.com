# 📘 Project 11 – Kafka Log Streamer

A Go-based tool that streams parsed infrastructure logs (starting with DHCP lease logs) into Apache Kafka, creating the backbone of an observability and alerting pipeline.

This is your first event ingestion service — fast, concurrent, and extensible. It’s built for piping logs → metrics → dashboards → alerts in future phases.

---

## 🧭 Overview

Logs contain events. Events become data. That data powers insights.

This project focuses on reading logs (from DHCP, DNS, or your CLI tools), parsing them into structured events, and publishing them to Kafka topics in real time.

Example use case:

- 📝 DHCP lease log → 🧠 parsed lease event → 📤 pushed to Kafka → 📊 consumed by Prometheus/Grafana

This helps build scalable, decoupled observability pipelines — common in real-world SRE & platform engineering stacks.

---

## 🛠 Tech Stack

- Go 1.21+
- Apache Kafka (local install or container)
- segmentio/kafka-go (Go Kafka client)
- bufio, channels, goroutines
- Optional: Docker Compose (Kafka + Zookeeper)
- Optional: JSON or Protobuf serialization

---

## 🎯 Goals

- Stream events from logs in near real-time
- Learn Kafka producer architecture in Go
- Build a reusable log-to-stream microservice
- Apply backpressure, retries, buffering, and batching

---

## 🚀 Getting Started

1. Set up Kafka locally (using Docker):

```bash
docker-compose -f docker-compose.kafka.yml up
```

2. Build the streamer:

```bash
go build -o kafkastreamer main.go
```

3. Run the streamer:

```bash
./kafkastreamer --log examples/dhcpd.log --topic dhcp-lease-events
```

4. Consume events (optional):

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic dhcp-lease-events --from-beginning
```

---

## 📂 Project Structure

```
main.go                      # CLI + main loop
cmd/
└── stream.go                # Core file reader + Kafka publisher
pkg/
├── parser/                  # DHCP log line → event struct
├── producer/                # Kafka connection, retries
examples/
└── dhcpd.log                # Simulated input file
configs/
└── kafka.yaml               # Brokers, topics, tuning
docker-compose.kafka.yml    # Local Kafka setup
README.md
```

---

## 📄 Event Format

Example published message:

```json
{
  "type": "DHCP_LEASE",
  "ip": "192.168.0.101",
  "mac": "00:11:22:33:44:55",
  "hostname": "laptop-01",
  "timestamp": "2025-11-04T14:02:09Z",
  "source": "dhcp_log_parser"
}
```

---

## ⚙️ Features

- ✅ Stream parsed log lines to Kafka topic
- ✅ Format messages as JSON
- ✅ Add message metadata (timestamp, source, etc)
- 🔁 Support retries, error logs, reconnect logic
- 🚦 Rate limiting (optional flag)
- 🧪 Local mock Kafka + sample data

---

## 🧠 What I Learned

To reflect after building:

- Kafka topic setup, partitions, brokers
- Go client configuration (timeouts, batches, retries)
- Log parsing as streaming architecture
- Structuring infrastructure events
- How producers and consumers scale independently

---

## 🔁 Next Steps

- Add multiple log stream types (DNS, Systemd, K8s)
- Add metrics exporter (requests per second, errors)
- Stream to multiple topics via config
- Use Kafka Connect to forward to Elasticsearch or Prometheus

---

## ✍️ Related Blog Ideas

- “Kafka for Infra: How I Stream DHCP Events in Real Time”
- “From Log Lines to Kafka Events — A DevOps Data Pipeline”
- “Building a Go Kafka Producer for Infrastructure Metrics”
