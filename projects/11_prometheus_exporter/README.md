# 📘 Project 11 – Prometheus Exporter (Go)

A Go-based service that exposes internal infrastructure metrics (DHCP leases, DNS status, system info) as Prometheus-compatible metrics via an HTTP endpoint.

This exporter acts as a bridge between the tools you’ve built and the dashboards/alerts you’ll need later. It lays the foundation for building custom monitoring for your environment.

---

## 🧭 Overview

Prometheus works by scraping endpoints that expose metrics in a specific format.

This exporter:

- Collects data (from files, logs, or CLI tools)
- Converts them into metrics (counters, gauges)
- Exposes them at /metrics via HTTP
- Can be discovered by Prometheus and visualized in Grafana

Use case:

- Monitor how many DHCP leases were issued
- Track how many DNS records match expected values
- Gauge system memory usage, disk status, or record TTLs

---

## 🛠 Tech Stack

- Go (1.21+)
- prometheus/client_golang (official exporter SDK)
- goroutines + channels
- net/http
- Optional:
  - YAML config for sources
  - SQLite or JSON file source
  - Templates for exporter modularity

---

## 🎯 Goals

- Build your own working /metrics endpoint
- Learn metric types: counter, gauge, histogram
- Structure custom infra data into meaningful metrics
- Serve those metrics over HTTP
- Prepare to plug into Grafana dashboards + alerts

---

## 🚀 Getting Started

1. Clone the project:

```bash
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/projects/11_prometheus_exporter
```

2. Build the binary:

```bash
go build -o exporter main.go
```

3. Run the service:

```bash
./exporter
```

4. Access metrics:
   http://localhost:9100/metrics

5. Add to prometheus.yml:

```yaml
scrape_configs:
  - job_name: "packet_guide_exporter"
    static_configs:
      - targets: ["localhost:9100"]
```

---

## 📄 Example Metrics

```
# HELP dhcp_lease_count Number of current DHCP leases
# TYPE dhcp_lease_count gauge
dhcp_lease_count 17

# HELP dns_record_validation_total Total number of DNS validation checks
# TYPE dns_record_validation_total counter
dns_record_validation_total{status="valid"} 32
dns_record_validation_total{status="invalid"} 4
```

---

## 📂 Project Structure

```
main.go                     # HTTP + metric registration
metrics/
└── dhcp.go                 # DHCP metrics collector
└── dns.go                  # DNS metrics collector
config.yaml                 # File/log location and settings
README.md
```

---

## 🧠 What I Learned

To reflect after building:

- How Prometheus exporters work internally
- Use of metrics types (Counter vs Gauge vs Histogram)
- Writing modular collectors in Go
- Creating HTTP endpoints with custom logic
- Decoupling data collection from data serving

---

## 🔁 Next Steps

- Add support for multiple collectors via config
- Add command-line flags for port or endpoints
- Add TLS support or authentication for /metrics
- Create a Grafana dashboard using this data

---

## ✍️ Related Blog Ideas

- “Building a Custom Prometheus Exporter in Go”
- “What I Learned Exposing Infra Metrics for the First Time”
- “The DevOps Journey from CLI Tools to Monitoring Pipelines”
