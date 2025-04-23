# 📘 Project 12 – Prometheus Exporter (Go)

A Go-based service that exposes internal infrastructure metrics (DHCP leases, DNS status) and basic application metrics (from the Simple API Service) as Prometheus-compatible metrics via an HTTP `/metrics` endpoint.

This exporter acts as a bridge between the tools and applications you’ve built and the dashboards/alerts you’ll need later. It lays the foundation for building custom monitoring for your environment, including your own services.

---

## 🧭 Overview

Prometheus works by scraping endpoints that expose metrics in a specific format.

This exporter:

- Collects data (from files, logs, CLI tools, or by querying the Simple API Service).
- Converts them into Prometheus metrics (counters, gauges).
- Exposes them at `/metrics` via HTTP.
- Can be discovered by Prometheus and visualized in Grafana.

Use case:

- Monitor how many DHCP leases were issued.
- Track how many DNS records match expected values.
- Monitor basic health and request metrics for the Simple API Service (Project 07a/07b).
- Gauge system memory usage, disk status, or record TTLs.

---

## 🛠 Tech Stack

- Go (1.21+)
- `prometheus/client_golang` (official exporter SDK)
- goroutines + channels
- `net/http`
- Optional:
  - YAML config for sources
  - SQLite or JSON file source
  - HTTP client to scrape the Simple API Service if it exposes its own metrics, or logic to instrument it directly if combined.

---

## 🎯 Goals

- Build your own working `/metrics` endpoint.
- Learn metric types: counter, gauge, histogram.
- Structure custom infra data and basic application data into meaningful metrics.
- Serve those metrics over HTTP.
- Practice instrumenting or collecting metrics from a custom application (the Simple API Service).
- Prepare to plug into Grafana dashboards + alerts.

---

## 🚀 Getting Started

1.  Clone the project:

    ```bash
    # Adjust path if necessary after renumbering
    git clone [https://github.com/your-username/packet-guide.com.git](https://github.com/your-username/packet-guide.com.git)
    cd [packet-guide.com/projects/12_prometheus_exporter](https://packet-guide.com/projects/12_prometheus_exporter)
    ```

2.  Build the binary:

    ```bash
    go build -o exporter main.go
    ```

3.  Run the service:

    ```bash
    ./exporter
    ```

    _(Note: Ensure the Simple API Service container from Project 07b is also running if the exporter needs to scrape it)._

4.  Access metrics:
    `http://localhost:9100/metrics`

5.  Add to `prometheus.yml`:
    ```yaml
    scrape_configs:
      - job_name: "packet_guide_exporter"
        static_configs:
          - targets: ["localhost:9100"]
    ```

---

## 📄 Example Metrics

`# HELP dhcp_lease_count Number of current DHCP leases # TYPE dhcp_lease_count gauge dhcp_lease_count 17 # HELP dns_record_validation_total Total number of DNS validation checks # TYPE dns_record_validation_total counter dns_record_validation_total{status="valid"} 32 dns_record_validation_total{status="invalid"} 4 # HELP simple_api_http_requests_total Total number of HTTP requests received by the Simple API # TYPE simple_api_http_requests_total counter simple_api_http_requests_total{method="GET",path="/items"} 54 simple_api_http_requests_total{method="POST",path="/items"} 12 # HELP simple_api_info Information about the Simple API service # TYPE simple_api_info gauge simple_api_info{version="v1.0.0"} 1`

---

## 📂 Project Structure

`main.go # HTTP + metric registration metrics/ └── dhcp.go # DHCP metrics collector └── dns.go # DNS metrics collector └── api.go # Simple API metrics collector (New) config.yaml # File/log location and settings README.md`

---

## 🧠 What I Learned

- How Prometheus exporters work internally.
- Use of metrics types (Counter vs Gauge vs Histogram).
- Writing modular collectors in Go.
- Creating HTTP endpoints with custom logic.
- Decoupling data collection from data serving.
- Basic approaches to instrumenting a custom application (like the API Service) for Prometheus.

---

## 🔁 Next Steps

- Add support for multiple collectors via config.
- Add command-line flags for port or endpoints.
- Add TLS support or authentication for `/metrics`.
- Create a Grafana dashboard using this data, including panels for the API Service (Project 13).
- Implement more sophisticated API metrics (e.g., request latency histograms).

---

## ✍️ Related Blog Ideas

- _Building a Custom Prometheus Exporter in Go_
- _What I Learned Exposing Infra Metrics for the First Time_
- _The DevOps Journey from CLI Tools to Monitoring Pipelines_
- _Monitoring Your Custom Go/Python API with Prometheus_
