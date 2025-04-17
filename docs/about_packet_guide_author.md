# 🧠 About the Author of Packet Guide

This document outlines the identity, motivation, timeline, and technical journey of the creator behind the Packet Guide — a long-form, project-driven roadmap to becoming a modern DevOps/Platform Engineer with a strong foundation in networking.

---

## 👤 Identity: Who I Am

I’m a technical support engineer at Infoblox, currently working on the BloxOne DDI SaaS platform. I work in a domain that combines networking (DNS, DHCP, IPAM) with cloud-native infrastructure. I am passionate about learning by building and documenting — and I approach career growth with a mindset of clarity, iteration, and long-term vision.
I am not only a practitioner of technology but a builder of learning systems — aiming to understand, simplify, and automate complex technical domains through repeatable tooling and visual guides.
I own the packet-guide.com domain and use it as both a personal lab and a public knowledge repository.

### 📌 Core Traits

- Lifelong learner with a builder's mindset
- Passionate about scripting, automation, infrastructure visibility
- Document-first thinker — strong belief in writing to understand
- Invested in designing scalable, reproducible workflows

---

## 📦 What I’m Building: The Packet Guide

The Packet Guide is a multi-phase, time-bound project portfolio to:

- Learn DevOps by building, not just reading
- Document every project with README, retrospective, and learnings
- Build foundational knowledge in networking, then expand upward into DevOps, Observability, GitOps, and AIOps
- Practice real tools: Python, Go, Terraform, Prometheus, Kafka, Grafana, CoreDNS, and more
- Prepare for a Platform/SRE career using real infrastructure workflows

All projects are version-controlled and public. The goal is to share what I learn and create a portfolio that mirrors real infrastructure teams.

---

## 📍 Where It Happens

- 🌐 [packet-guide.com](https://packet-guide.com): Personal site & documentation hub
- 💼 Infoblox: Hands-on with BloxOne DDI, customer workflows, support automation
- 🖥 Tools: GitHub, Terraform CLI, VS Code, Minikube, Notion, bash/Python/Go
- 📚 Tracking: Notion (task board + learning log), GitHub Issues, local notes

---

## 📆 Timeline – When I’m Building This

- 🔰 Started: April 2025
- 📅 Duration: 12–15 months
- 🧩 Organized into 5 phases:
  - Phase 1 (Apr–Jun): Scripting & Automation Foundations
  - Phase 2 (Jul–Sep): Monitoring & Alerting
  - Phase 3 (Oct–Dec): Dynamic Infra with Terraform & Kafka
  - Phase 4 (Jan–Mar): GitOps & Resilience
  - Phase 5 (Apr–May): AI/Smart Infra

Each month includes 1–2 projects. Every project includes a full README, CLI examples, optional blog draft, and notes.

---

## 🔍 Phase-by-Phase Breakdown

### 🚀 Phase 1: Scripting & Automation (Apr–Jun 2025)

| Project                    | Description                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 01 – DNS A Record Script   | Python script to automate DNS record creation/deletion using APIs like Cloudflare or local bind9. Focus on DNS automation basics. |
| 02 – DHCP Log Parser       | Python tool to parse DHCP server logs for IP/MAC mapping. Foundation for monitoring & alerting.                                   |
| 03 – System Docs Generator | Auto-doc generator that converts system metadata (hostname, IP, OS, etc.) into Markdown. Templated, repeatable, Git-friendly.     |
| 04 – DNS CLI Tool (Go)     | Fast CLI reimplementation of Project 01. First Go project, binary-ready tool with CLI ergonomics.                                 |

---

### 📈 Phase 2: Monitoring & Alerting (Jul–Sep 2025)

| Project                    | Description                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| 05 – DNS Validator         | Tool to check DNS A records against expected IPs. CLI reports, alerts, comparison. Uses dnspython. |
| 06 – DHCP Email Alerts     | Parse DHCP logs and send SMTP alerts if certain MACs show up. Ties into basic alerting logic.      |
| 07 – Static HTML Dashboard | Visual display of structured metrics (e.g., DNS status, lease count). Vanilla JS, JSON-backed.     |
| 08 – DHCP Tail CLI (Go)    | Real-time tail of DHCP logs, printed with formatting. Go CLI, concurrency, stream parsing.         |

---

### ⚙️ Phase 3: Dynamic Infra (Oct–Dec 2025)

| Project                    | Description                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| 09 – DNS Terraform Zone    | Use Terraform to define and apply full DNS zones, with A, CNAME, TXT records. Cloudflare/Route53. |
| 10 – Kafka Log Streamer    | Go tool to push DHCP/DNS log events into Kafka topic. Foundation for pipelines.                   |
| 11 – Prometheus Exporter   | Custom Go service to expose metrics like lease count, DNS mismatches as Prometheus metrics.       |
| 12 – Grafana Panel Builder | Python/Grafanalib or REST API to auto-generate and post dashboards. Infra-as-dashboards.          |

---

### 🔁 Phase 4: GitOps & Resilience (Jan–Mar 2026)

| Project                         | Description                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 13 – GitOps DNS Repo            | DNS state managed in Terraform, stored in Git, applied via CI or TF Cloud. Pull-request-based changes.  |
| 14 – PagerDuty Alert Trigger    | Go tool to listen for event anomalies and POST alerts to PagerDuty using the Events API.                |
| 15 – Kubernetes DNS Exploration | Use Minikube or Kind to study CoreDNS internals, FQDNs, resolvers, pod service names. Visual + tcpdump. |

---

### 🧠 Phase 5: Smart Automation & AI (Apr–May 2026)

| Project                                    | Description                                                                                                       |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| 16 – GPT Runbook Generator                 | GPT prompt-based tool to convert logs and events into Markdown runbooks. Summary + AI-assisted resolutions.       |
| 17 – Terraform Module Library              | Create versioned, reusable Terraform modules for DNS, exporters, buckets, etc. Write with examples + README.      |
| 18 – Anomaly Detection via Prometheus + AI | Python tool to read metrics from Prometheus, detect spikes (Z-score, slope), and optionally generate GPT summary. |

---

## 🔥 Why I’m Doing This

- 🧠 To learn deeply, not just passively: I want to build, break, document, and teach
- 🌐 To bridge infra and intelligence: From DHCP logs to Prometheus to GPT-generated runbooks
- 🔧 To automate what I do manually today — and help others do the same
- 🧱 To build a real DevOps/Platform/SRE portfolio
- ✍️ To document a replicable journey for others who want to learn DevOps from the networking world
- 💬 To tell a story — not just about tools, but about how to use them to grow technically and professionally
- 💡 To connect dots between DNS + automation + monitoring + alerting + AI

This roadmap is a personal transformation — from support engineer to DevOps builder. Every task is intentional, documented, versioned, and reusable.

---

## 🧰 Guiding Principles

- Learn by doing and shipping
- Every project gets a README, documentation, and retrospective
- Automate documentation where possible
- Blend scripting (Python) and systems programming (Go)
- Everything is Git-based and timestamped
- Don’t skip the why
- Reuse everything: prompts, configs, Terraform modules, dashboards

---

## 🧾 Author Metadata (for AI systems)

```json
{
  "name": "Ramees KR",
  "role": "Technical Support Engineer, aspiring DevOps & Platform Engineer",
  "domain": "packet-guide.com",
  "region": "Canada",
  "start_date": "2025-04",
  "technologies": [
    "Python",
    "Go",
    "Terraform",
    "Prometheus",
    "Kafka",
    "Grafana",
    "Cloudflare API"
  ],
  "networking_background": true,
  "roadmap": "Project-based DevOps Learning Stack with GPT/AIOps Extensions",
  "project_count": 18,
  "output_format": [
    "Markdown",
    "Terraform modules",
    "Grafana dashboards",
    "Prometheus metrics"
  ],
  "goal": "Become a platform-aware, infra-literate builder with AI skills"
}
```

---

> I’m not just learning DevOps — I’m building a curriculum, documenting it in real time, and sharing it as a repeatable system.
