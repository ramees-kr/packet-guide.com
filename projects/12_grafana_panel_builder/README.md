# 📘 Project 12 – Grafana Panel Builder

A Python tool that automates the creation and configuration of Grafana dashboards and panels using the Grafana HTTP API.

This project turns manual dashboard setups into repeatable scripts — enabling GitOps-style observability and scaling your monitoring workflows across environments.

---

## 🧭 Overview

Grafana is the visual layer of observability — but manually building panels is slow, error-prone, and hard to replicate.

This tool solves that by:

- Generating dashboards and panels via API
- Saving JSON models of dashboards in version control
- Connecting to Prometheus-based data sources
- Allowing teams to reuse, test, and promote dashboards

Use case:

- Automatically build dashboards for DHCP leases, DNS record health, exporter status, etc.
- Replicate dashboards across environments

---

## 🛠 Tech Stack

- Python 3.x
- requests or grafanalib
- Jinja2 (optional) for templating dashboard JSON
- Grafana HTTP API
- dotenv / YAML for config

---

## 🎯 Goals

- Learn how Grafana’s JSON models work
- Interact with the Grafana REST API to CRUD dashboards
- Create reusable, parameterized dashboard templates
- Think in infrastructure-as-dashboards (observability as code)

---

## 🚀 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/projects/12_grafana_panel_builder
```

2. Install dependencies:

```bash
pip install requests python-dotenv jinja2
```

3. Configure .env:

```
GRAFANA_URL=http://localhost:3000
GRAFANA_API_KEY=your_api_key
```

4. Run dashboard builder:

```bash
python build_dashboard.py --source dashboards/dhcp.json.j2 --output dashboards/dhcp-final.json --apply
```

---

## ⚙️ Features

- ✅ Load template JSON files (or Jinja2 templates)
- ✅ Fill in values (title, datasource, targets)
- ✅ POST dashboard to Grafana API
- ✅ Save dashboard models in dashboards/ folder
- 🔁 Reuse and regenerate dashboards in CI/CD

---

## 📄 Sample Dashboard JSON Snippet

```json
{
  "title": "DHCP Monitoring",
  "panels": [
    {
      "type": "graph",
      "title": "Active DHCP Leases",
      "targets": [
        {
          "expr": "dhcp_lease_count",
          "format": "time_series"
        }
      ]
    }
  ]
}
```

---

## 📂 Project Structure

```
build_dashboard.py       # Main builder logic
dashboards/
├── dhcp.json.j2         # Jinja2 template for DHCP panel
├── dns.json.j2          # DNS health panel template
configs/
└── datasources.yaml     # Reusable Prometheus/Influx sources
.env                     # Grafana credentials and URL
README.md
```

---

## 🧠 What I Learned

To reflect after building:

- Grafana dashboard structure (JSON schema)
- How panels, rows, and data sources fit together
- Using Jinja2 to render dashboards with variables
- Calling REST APIs securely (API keys, headers)
- Observability as Code = dashboards you can ship

---

## 🔁 Next Steps

- Add support for folders and tags
- Build a CLI wrapper for multi-dashboard automation
- Validate dashboards before upload
- Push via GitHub Actions to remote Grafana instance

---

## ✍️ Related Blog Ideas

- “Automating Grafana Dashboards with Python”
- “Version-Controlled Monitoring: Dashboards as Code”
- “From JSON to Visuals: Building Infra Dashboards Programmatically”
