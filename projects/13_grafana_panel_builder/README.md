# 📘 Project 13 – Grafana Panel Builder

A Python tool that automates the creation and configuration of Grafana dashboards and panels using the Grafana HTTP API. This tool will be used to visualize metrics from various Packet Guide projects, including the Simple API Service monitored by the Project 12 Prometheus Exporter.

This project turns manual dashboard setups into repeatable scripts — enabling GitOps‑style observability and scaling your monitoring workflows across environments and applications.

---

## 🧭 Overview

Grafana is the visual layer of observability — but manually building panels is slow, error‑prone, and hard to replicate, especially as you add more services.

This tool solves that by:

- Generating dashboards and panels via API calls to Grafana
- Saving JSON models of dashboards in version control (Dashboards‑as‑Code)
- Connecting to Prometheus data sources (like the one populated by Project 12)
- Allowing automated creation of dashboards for infrastructure components (DHCP, DNS) and custom applications (the Simple API Service)
- Enabling teams to reuse, test, and promote dashboards consistently

**Use case:**

- Automatically build dashboards for DHCP leases, DNS record health, exporter status, API request rates, API latency, and API error counts
- Replicate dashboards across environments (dev, staging, prod)

---

## 🛠 Tech Stack

- **Python 3.x**
- `requests` or `grafanalib`
- **Jinja2** (optional) for templating dashboard JSON
- Grafana HTTP API
- `dotenv` / YAML for config (API keys, Grafana URL)
- Prometheus as the primary data source (populated by Project 12 exporter)

---

## 🎯 Goals

- Learn how Grafana’s JSON models work for dashboards and panels
- Interact with the Grafana REST API to programmatically create and update dashboards
- Create reusable, parameterized dashboard templates (e.g., using Jinja2)
- Visualize metrics from custom applications (Simple API Service) alongside infrastructure metrics
- Implement infrastructure‑as‑dashboards (observability as code)

---

## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   # Adjust path if necessary after renumbering
   git clone https://github.com/your-username/packet-guide.com.git
   cd packet-guide.com/projects/13_grafana_panel_builder
   ```
2. **Install dependencies**
   ```bash
   pip install requests python-dotenv jinja2
   ```
3. **Configure `.env`**
   ```bash
   GRAFANA_URL=http://localhost:3000
   GRAFANA_API_KEY=your_api_key
   ```
   _Ensure Grafana is running and accessible._
4. **Ensure Prometheus** (and the Project 12 exporter) are running and collecting metrics, including those from the API service.
5. **Run dashboard builder** with a template:
   ```bash
   # Example for building an API service dashboard
   python build_dashboard.py \
     --source dashboards/api_service.json.j2 \
     --output dashboards/api-service-final.json \
     --apply
   ```

---

## ⚙️ Features

- ✅ Load template JSON files (or Jinja2 templates)
- ✅ Fill in values (title, datasource name, PromQL queries, panel types)
- ✅ POST dashboard JSON to Grafana API to create/update dashboards
- ✅ Save dashboard models in a `dashboards/` folder for version control
- ✅ Reuse and regenerate dashboards, ensuring consistency

---

## 📄 Sample Dashboard JSON Snippet (API Request Rate Panel)

```json
{
  // ... dashboard metadata ...
  "panels": [
    {
      "type": "timeseries", // Or graph
      "title": "API HTTP Request Rate",
      "datasource": {
        // Reference your Prometheus datasource configured in Grafana
        "type": "prometheus",
        "uid": "YOUR_PROMETHEUS_DATASOURCE_UID"
      },
      "targets": [
        {
          // Query metrics exposed by Project 12 exporter
          "expr": "sum(rate(simple_api_http_requests_total[5m])) by (method, path)",
          "legendFormat": "{{method}} {{path}}",
          "refId": "A"
        }
      ]
      // ... other panel options ...
    }
    // ... other panels for latency, errors, etc. ...
  ]
  // ... dashboard variables, time range etc ...
}
```

---

## 📂 Project Structure

```text
build_dashboard.py       # Main builder logic
dashboards/
├── dhcp.json.j2         # Jinja2 template for DHCP dashboard
├── dns.json.j2          # DNS health dashboard template
├── api_service.json.j2  # Template for API service dashboard (New)
configs/
└── datasources.yaml     # (Optional) Info about Grafana datasources
.env                     # Grafana credentials and URL
README.md
```

---

## 🧠 What I Learned

- Grafana dashboard structure (JSON schema) and how panels, rows, and data sources fit together
- Using Jinja2 (or similar templating) to render dashboards with variables like data source UIDs or query parameters
- Calling REST APIs securely using API keys and appropriate headers
- Creating dashboards for custom application metrics alongside infrastructure data
- Benefits of Observability as Code for managing dashboards like software artifacts

---

## 🔁 Next Steps

- Add support for Grafana folders and tags via the API
- Build a more robust CLI wrapper for managing multiple dashboard templates
- Validate dashboard JSON models before uploading them
- Integrate dashboard deployment into a CI/CD pipeline or GitOps workflow
- Explore creating Grafana alerting rules via the API

---

## ✍️ Related Blog Ideas

- _Automating Grafana Dashboards with Python_
- _Version-Controlled Monitoring: Dashboards as Code_
- _From JSON to Visuals: Building Infra Dashboards Programmatically_
- _Grafana‑as‑Code for Your Custom Applications_
