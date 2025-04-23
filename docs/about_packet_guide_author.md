# 🧠 About the Author of Packet Guide

This document outlines the identity, motivation, timeline, and technical journey of the creator behind the Packet Guide — a long-form, project-driven roadmap to becoming a modern DevOps/Platform Engineer with a strong foundation in networking and integrated application development practices.

---

## 👤 Identity: Who I Am

I’m a technical support engineer at Infoblox, currently working on the BloxOne DDI SaaS platform. I work in a domain that combines networking (DNS, DHCP, IPAM) with cloud-native infrastructure. I am passionate about learning by building and documenting — and I approach career growth with a mindset of clarity, iteration, and long-term vision.
I am not only a practitioner of technology but a builder of learning systems — aiming to understand, simplify, and automate complex technical domains through repeatable tooling, application deployment, and visual guides.
I own the packet-guide.com domain and use it as both a personal lab and a public knowledge repository.

### 📌 Core Traits

- Lifelong learner with a builder's mindset
- Passionate about scripting, automation, infrastructure visibility, and application deployment
- Document-first thinker — strong belief in writing to understand
- Invested in designing scalable, reproducible workflows

---

## 📦 What I’m Building: The Packet Guide

The Packet Guide is a multi-phase, time-bound project portfolio to:

- Learn DevOps by building, not just reading
- Build and deploy simple applications alongside the infrastructure that supports them
- Document every project with README, retrospective, and learnings
- Build foundational knowledge in networking, then expand upward into DevOps, Observability, GitOps, CI/CD, and AIOps
- Practice real tools: Python, Go, Docker, Terraform, Prometheus, Kafka, Grafana, Kubernetes, CoreDNS, and more
- Prepare for a Platform/SRE career using real infrastructure workflows

All projects are version-controlled and public. The goal is to share what I learn and create a portfolio that mirrors real infrastructure teams.

---

## 📍 Where It Happens

- 🌐 [packet-guide.com](https://packet-guide.com): Personal site & documentation hub
- 💼 Infoblox: Hands-on with BloxOne DDI, customer workflows, support automation
- 🖥 Tools: GitHub, Terraform CLI, VS Code, Minikube, Notion, Docker, bash/Python/Go
- 📚 Tracking: Notion (task board + learning log), GitHub Issues, local notes

---

## 📆 Timeline – When I’m Building This

- 🔰 Started: April 2025
- 📅 Duration: 12–15 months
- 🧩 Organized into 5 phases:
  - Phase 1 (Apr–Jun 2025): Scripting & Automation Foundations
  - Phase 2 (Jul–Sep 2025): Monitoring, Alerting & Basic App Dev
  - Phase 3 (Oct–Dec 2025): Dynamic Infra & App Observability
  - Phase 4 (Jan–Mar 2026): GitOps, Resilience & CI/CD
  - Phase 5 (Apr–May 2026): Smart Automation, Modules & Contribution

Each month includes 1–2 projects. Every project includes a full README, CLI examples, optional blog draft, and notes.

---

## 🔍 Phase-by-Phase Breakdown

### 🌱 Phase 1: Scripting & Automation Foundations (Apr–Jun 2025)

_(Focus: Foundational scripting, automation, basic Go)_

| Project                    | Description                                                                                                                         |
| :------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| 01 – DNS A Record Script   | Python script to automate DNS record creation/deletion using APIs. Focus on DNS automation basics, API interaction, error handling. |
| 02 – DHCP Log Parser       | Python tool to parse DHCP server logs (Kea JSON). Foundation for monitoring & alerting. Focus on parsing, data structures.          |
| 03 – System Docs Generator | Auto-doc generator (Python) for system metadata into Markdown. Templated, repeatable, Git-friendly.                                 |
| 04 – DNS CLI Tool (Go)     | Fast CLI reimplementation of Project 01 in Go. First Go project, binary-ready tool with CLI ergonomics, basic testing.              |

---

### 📈 Phase 2: Monitoring, Alerting & Basic App Dev (Jul–Sep 2025)

_(Focus: Validation, basic alerting, building and containerizing a simple service)_

| Project                      | Description                                                                                                  |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------- |
| 05 – DNS Validator           | Tool (Python) to check DNS A records against expected IPs. CLI reports, comparison logic. Uses dnspython.    |
| 06 – DHCP Email Alerts       | Parse DHCP logs (Python) and send SMTP alerts if specific MACs show up. Basic alerting workflow.             |
| 07a – Simple API Service     | Build a basic REST API service (e.g., CRUD for simple data) using Go or Python. Focus on API design.         |
| 07b – Containerize API       | Create a Dockerfile for the API service, build the container image, and run it locally.                      |
| 08 – Static Dashboard (HTML) | Visual display (HTML/JS) of structured metrics from early tools (e.g., DNS status). Vanilla JS, JSON-backed. |
| 09 – DHCP Tail CLI Tool (Go) | Real-time tail of DHCP logs (Go), printed with formatting. Focus on concurrency, stream parsing, testing.    |

---

### ⚙️ Phase 3: Dynamic Infra & App Observability (Oct–Dec 2025)

_(Focus: IaC, event streaming, custom metrics, deploying and observing the API service)_

| Project                       | Description                                                                                                                    |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| 10 – DNS Terraform Zone       | Use Terraform to define and apply full DNS zones (A, CNAME, TXT). Cloudflare/Route53 provider. Focus on IaC best practices.    |
| 11 – Kafka Log Streamer       | Go tool to push DHCP/DNS log events into Kafka topic. Foundation for pipelines. Focus on Kafka producer logic, error handling. |
| 12 – Prometheus Exporter (Go) | Custom Go service exposing metrics (DHCP, DNS) and basic metrics from the Simple API Service via `/metrics` endpoint.          |
| 13 – Grafana Panel Builder    | Python/API tool to auto-generate Grafana dashboards for exporter metrics, including API service metrics.                       |

---

### 🔄 Phase 4: GitOps, Resilience & CI/CD (Jan–Mar 2026)

_(Focus: GitOps workflows, advanced alerting, K8s fundamentals, basic CI/CD for the API)_

| Project                           | Description                                                                                                                       |
| :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| 14 – GitOps DNS Repo              | DNS state managed in Terraform, stored in Git, applied via CI or TF Cloud. Pull-request-based changes.                            |
| 15a – Basic CI/CD for API Service | Build a basic CI pipeline (e.g., GitHub Actions) to automatically test the API service code and build its Docker container image. |
| 16 – PagerDuty Alert Trigger      | Go tool to listen for event anomalies (from Kafka/logs) and POST enriched alerts to PagerDuty using the Events API.               |
| 17 – Kubernetes DNS & App Deploy  | Use Minikube/Kind to study CoreDNS internals and deploy the Simple API Service container into Kubernetes.                         |

---

### 🧠 Phase 5: Smart Automation, Modules & Contribution (Apr – May 2026)

_(Focus: AI Ops, reusable infrastructure code, potential open-source involvement)_

| Project                                    | Description                                                                                                                          |
| :----------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| 18 – GPT Runbook Generator                 | GPT prompt-based tool (Python) to convert logs/alerts into Markdown runbooks. AI-assisted resolutions.                               |
| 19 – Terraform Module Library              | Create versioned, reusable Terraform modules for DNS, exporters, K8s manifests, etc. Write with examples + README.                   |
| 20 – Anomaly Detection via Prometheus + AI | Python tool to read metrics from Prometheus (including API metrics), detect spikes/anomalies, and optionally generate GPT summary.   |
| 21 – Open Source Contribution              | Identify a relevant open-source DevOps/Infra tool (e.g., Terraform provider, K8s tool, Prometheus exporter) and make a contribution. |

---

## 🔥 Why I’m Doing This

- 🧠 To learn deeply, not just passively: I want to build, break, document, and teach
- 🌐 To bridge infra and intelligence: From DHCP logs to Prometheus to GPT-generated runbooks
- 🔧 To automate what I do manually today — and help others do the same
- 🧱 To build a real DevOps/Platform/SRE portfolio that includes application deployment and management
- ✍️ To document a replicable journey for others who want to learn DevOps from the networking world
- 💬 To tell a story — not just about tools, but about how to use them to grow technically and professionally
- 💡 To connect dots between DNS + automation + monitoring + alerting + application lifecycle + AI

This roadmap is a personal transformation — from support engineer to DevOps builder. Every task is intentional, documented, versioned, and reusable.

---

## 🧰 Guiding Principles

- Learn by doing and shipping
- Every project gets a README, documentation, and retrospective
- Automate documentation where possible
- Blend scripting (Python) and systems programming (Go)
- Apply software development best practices (testing, quality) to infrastructure code and tools
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
    "Docker",
    "Terraform",
    "Prometheus",
    "Kafka",
    "Grafana",
    "Kubernetes",
    "Cloudflare API",
    "Git",
    "CI/CD Concepts"
  ],
  "networking_background": true,
  "roadmap": "Project-based DevOps Learning Stack with Integrated App Dev & AI/AIOps Extensions",
  "project_count": 21,
  "output_format": [
    "Markdown",
    "Terraform modules",
    "Grafana dashboards",
    "Prometheus metrics",
    "Docker Images",
    "CLI Tools",
    "API Service"
  ],
  "goal": "Become a platform-aware, infra-literate builder with application development/deployment skills and AI integration capabilities"
}
```
