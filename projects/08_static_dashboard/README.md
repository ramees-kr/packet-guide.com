# 📘 Project 08 – Static Dashboard (HTML)

A simple HTML+JavaScript dashboard to visually present infrastructure data, generated manually or from previous Packet Guide projects (DNS records, DHCP leases, system info, etc).

This project helps develop frontend skills that complement your backend tools — and lays the foundation for real-time dashboards later (with Prometheus or Kafka).

---

## 🧭 Overview

DevOps and SREs need ways to display state — whether it's current DNS usage, recent DHCP events, or system health.

This project creates a single HTML page that:

- Reads static JSON data (or CSV)
- Displays it in formatted tables, charts, or grids
- Can be updated by regenerating the data source
- Uses only basic HTML/CSS/JS (no framework)

Later, this becomes the frontend to more dynamic backends.

---

## 🛠 Tech Stack

- HTML5 / CSS3
- Vanilla JavaScript (ES6)
- Chart.js or Plotly.js (optional)
- File-based JSON as input (from Project 02, 05, etc)

---

## 🎯 Goals

- Learn how to present structured data visually
- Build a modular dashboard template
- Practice integrating tools with a web frontend
- Explore CSS layout and basic DOM scripting

---

## 🚀 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/projects/07_static_dashboard
```

2. Open dashboard:

```bash
open dashboard.html  # macOS
xdg-open dashboard.html  # Linux
```

3. Or serve locally:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000/dashboard.html

---

## 📄 Sample Data Format

dns_data.json:

```json
[
  {
    "hostname": "dev.packet-guide.com",
    "ip": "10.0.0.5",
    "status": "✅"
  },
  {
    "hostname": "stale.packet-guide.com",
    "ip": "192.168.1.12",
    "status": "❌ Mismatch"
  }
]
```

---

## 📂 Project Structure

```
dashboard.html          # Main HTML layout
data/
├── dns_data.json       # Sample DNS validation results
├── leases.json         # DHCP summary
js/
└── render.js           # Table/chart rendering logic
css/
└── styles.css          # Styling and layout
README.md               # You're here
```

---

## 🧠 What I Learned

To update while building:

- How to load JSON with JS and populate the DOM
- CSS layout, flex/grid
- Charting basics (Chart.js or native SVG)
- How to create dashboards from logs

---

## 🔁 Next Steps

- Add tabs for multiple views (DNS, DHCP, etc)
- Embed visualizations (bar chart for lease count)
- Auto-regenerate data via scripts
- Style for mobile display or dark mode

---

## ✍️ Related Blog Ideas

- “My First Infrastructure Dashboard (No Backend Required)”
- “Visualizing DNS Health with HTML + JSON”
- “A Static Dashboard That Actually Works for DevOps”
