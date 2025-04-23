# 📅 Revised Packet Guide Roadmap (v4.1 - Schedule Adjusted)

---

## 🌱 Phase 1: Scripting & Automation Foundations (Apr – Jun 2025)

_(Focus: Foundational scripting, automation, basic Go)_

| Project                    | Language | Month | Notes                                                   |
| :------------------------- | :------- | :---- | :------------------------------------------------------ |
| 01 – DNS A Record Script   | Python   | April | Focus on API interaction, error handling, clean code    |
| 02 – DHCP Log Parser       | Python   | May   | Focus on robust parsing (JSON for Kea), data structures |
| 03 – System Docs Generator | Python   | June  | Focus on templating, system data gathering              |
| 04 – DNS CLI Tool (Go)     | Go       | June  | Focus on Go idioms, CLI structure, basic testing        |

---

## 📈 Phase 2: Monitoring, Alerting & Basic App Dev (Jul – Sep 2025)

_(Focus: Validation, basic alerting, building and containerizing a simple service)_

| Project                      | Language  | Month     | Notes                                                           |
| :--------------------------- | :-------- | :-------- | :-------------------------------------------------------------- |
| 05 – DNS Validator           | Python    | July      | Focus on validation logic, reporting                            |
| 06 – DHCP Email Alerts       | Python    | August    | Focus on alerting workflows, configuration management           |
| 07a – Simple API Service     | Go/Python | August    | Build a basic REST API (e.g., CRUD for simple data)             |
| 07b – Containerize API       | Docker    | August    | Create a Dockerfile for the API service, build image            |
| 08 – Static Dashboard (HTML) | HTML/JS   | September | REVISED: Display data from Projects 02, 03, 05 outputs          |
| 09 – DHCP Tail CLI Tool (Go) | Go        | September | Focus on real-time processing, Go concurrency patterns, testing |

---

## ⚙️ Phase 3: Dynamic Infra & App Observability (Oct – Dec 2025)

_(Focus: IaC including DNSSEC, event streaming, custom metrics, observing the API service)_

| Project                          | Language | Month    | Notes                                                                                              |
| :------------------------------- | :------- | :------- | :------------------------------------------------------------------------------------------------- |
| 10 – DNS Terraform Zone & DNSSEC | HCL      | October  | Manage DNS via IaC, including enabling/managing DNSSEC configurations. Focus on TF best practices. |
| 11 – Kafka Log Streamer          | Go       | November | Stream DHCP/DNS logs to Kafka, focus on producer logic, error handling                             |
| 12 – Prometheus Exporter (Go)    | Go       | December | Expose metrics for DHCP/DNS _and_ the Simple API Service                                           |
| 13 – Grafana Panel Builder       | Python   | December | Automate dashboards for exporter metrics & API Service                                             |

---

## 🔄 Phase 4: GitOps, Resilience, CI/CD & K8s Foundations (Jan – Mar 2026)

_(Focus: GitOps workflows, advanced alerting, K8s deployment foundations, basic CI/CD)_

| Project                           | Language   | Month    | Notes                                                                               |
| :-------------------------------- | :--------- | :------- | :---------------------------------------------------------------------------------- |
| 14 – GitOps DNS Repo              | Git/HCL    | January  | Manage Terraform DNS (including DNSSEC state) via Git PRs                           |
| 15a – Basic CI/CD for API Service | YAML/Bash  | January  | Build GitHub Actions/GitLab CI pipeline to test & build API container               |
| 16 – PagerDuty Alert Trigger      | Go         | February | Trigger PD alerts from Kafka/events, focus on alert enrichment                      |
| 17a – K8s App Deploy & DNS        | Mixed/YAML | March    | Deploy API to K8s using Deployment/Service, explore CoreDNS for internal discovery. |

---

## 🧠 Phase 5: K8s Exposure, Smart Automation, Modules & Contribution (Apr – Jun 2026)

_(Focus: K8s Ingress/HTTPS, AI Ops, reusable infrastructure code, potential open-source involvement)_

| Project                                    | Language   | Month | Notes                                                                        |
| :----------------------------------------- | :--------- | :---- | :--------------------------------------------------------------------------- |
| 17b – K8s Ingress & HTTPS                  | Mixed/YAML | April | Deploy cert-manager & Ingress controller for automated HTTPS for the API.    |
| 18 – GPT Runbook Generator                 | Python/AI  | May   | Generate runbooks from alerts/logs                                           |
| 19 – Terraform Module Library              | HCL        | May   | Create reusable Terraform modules for DNS, K8s manifests, cert-manager, etc. |
| 20 – Anomaly Detection via Prometheus + AI | Python/AI  | June  | Detect anomalies in Prometheus metrics (including API service metrics)       |
| 21 – Open Source Contribution (Optional)   | Various    | June  | Identify & contribute to a relevant open-source DevOps/Infra tool            |

---

**General Emphasis Throughout:**

- **Code Quality:** Apply software development best practices (clean code, comments, structure) to all Python/Go tools.
- **Testing:** Implement unit and integration tests for key functions in custom tools.
- **Security:** Incorporate security considerations (like DNSSEC, HTTPS) where applicable.
- **Design Patterns:** Consider appropriate design patterns for building more complex tools.
