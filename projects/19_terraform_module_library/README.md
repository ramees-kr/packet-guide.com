# 📘 Project 19 – Terraform Module Library

This project builds a set of reusable Terraform modules that encapsulate common infrastructure components—such as DNS records, Kubernetes resources (Deployments, Services, Ingress), cert-manager configurations, monitoring exporters, alert routes, and cloud resources—with sensible defaults, input validation, and documentation.

These modules form the foundation of repeatable, scalable infrastructure-as-code for both cloud and Kubernetes environments within the Packet Guide project.

---

## 🧭 Overview

Terraform modules allow you to define infrastructure as reusable, versioned components. You can abstract repetitive patterns—like DNS record sets, standard Kubernetes deployments, or cert-manager issuers—and apply consistent design across environments or applications.

In this project you will:

- Write parameterized modules for DNS, Kubernetes deployments, Ingress resources, cert-manager issuers, and more
- Document module usage via README files and examples
- Enforce input validation and output consistency
- Test module behavior using `terraform plan` and (optionally) CI checks

You'll extend the “packet-guide-terraform-library”—usable for personal projects and real deployments, covering both traditional infra and Kubernetes configurations.

---

## 🛠 Tech Stack

- Terraform v1.5+
- HCL2 syntax
- Providers: Cloudflare, AWS, Kubernetes, Helm (optional)
- Kubernetes concepts: Deployments, Services, Ingress, Namespaces, ConfigMaps, Secrets
- cert-manager concepts: Issuer, ClusterIssuer, Certificate
- Pre-commit hooks: `tflint`, `tfsec`, `terraform fmt`
- Optional: Terratest (Go), Checkov for policy checks
- GitHub/GitLab repository for version control

---

## 🎯 Goals

- Build modular, reusable Terraform code for various infrastructure types
- Define inputs, outputs, and validation for modules
- Standardize components like DNS records, Kubernetes deployments, Ingress rules, and cert-manager configurations
- Use modules across multiple projects with confidence
- (Optional) Publish modules to Terraform Registry or internal registry
- Encapsulate Kubernetes YAML complexity within Terraform modules

---

## 📂 Project Structure

```text
modules/
├── dns_record/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── README.md
├── k8s_app_deployment/           # Kubernetes Deployment & Service
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── README.md
├── k8s_ingress_tls/              # Ingress + TLS via cert-manager
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── README.md
├── k8s_certmanager_issuer/       # cert-manager Issuer/ClusterIssuer
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── README.md
└── ... (other modules)
examples/                         # Usage examples
tests/                            # Validation tests
.pre-commit-config.yaml
README.md                         # This file
```

---

## 📦 Potential Terraform Modules

| Module Name                | Purpose / Origin                                                                                                        | Relevant Projects |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `dns_record_set`           | Manage a set of DNS records (A, CNAME, TXT) within a zone, including DNSSEC state if supported by the provider.         | 10, 14            |
| `k8s_namespace`            | Create and manage a Kubernetes namespace.                                                                               | 17a, 17b+         |
| `k8s_app_deployment`       | Deploy a standard application using Deployment & Service; parameterize image, replicas, ports, probes, resource limits. | 17a               |
| `k8s_ingress_tls`          | Configure an Nginx Ingress resource with TLS termination via cert-manager annotations and secrets.                      | 17b               |
| `k8s_certmanager_issuer`   | Deploy a cert-manager Issuer or ClusterIssuer (e.g., Let’s Encrypt ACME).                                               | 17b               |
| `prometheus_exporter_k8s`  | Deploy a standard Prometheus exporter pattern to Kubernetes (Deployment/Service for exporters).                         | 12 (if on K8s)    |
| `pagerduty_service_config` | Configure PagerDuty services or integrations via Terraform.                                                             | 16                |

---

## 🔁 Next Steps

- Tag modules with versions and maintain changelogs
- Publish modules to Terraform Registry or an internal registry
- Add CI checks: `terraform validate`, `tfsec`, `tflint`
- Write comprehensive usage docs in each module’s `README.md`
- Refactor existing Packet Guide infrastructure (Projects 10, 17a/17b) to consume these modules
- Explore Helm provider modules for chart deployments

---

## ✍️ Related Blog Ideas

- _Building a Terraform Module Library From Scratch_
- _How Reusable Modules Saved Me Hours of DevOps Time_
- _Terraform Modules for Kubernetes: Best Practices and Patterns_
- _Managing Kubernetes Deployments and Services with Reusable Terraform Modules_
- _Creating a Terraform Module for cert-manager ClusterIssuers_

## 📦 Suggested Modules to Build

| Module Name              | Purpose                                               |
| ------------------------ | ----------------------------------------------------- |
| `dns_record`             | Create A, CNAME, TXT records                          |
| `k8s_namespace`          | Create a Kubernetes namespace                         |
| `k8s_deployment`         | Standard Deployment resource (image, replicas, ports) |
| `k8s_service`            | Standard Service (ClusterIP, NodePort)                |
| `k8s_ingress_tls`        | Nginx Ingress with TLS                                |
| `k8s_certmanager_issuer` | cert-manager Issuer/ClusterIssuer                     |
| `pagerduty_route`        | Define PagerDuty routing policies                     |
| `exporter_service`       | Deploy Prometheus exporters                           |
| `logging_bucket`         | Create log storage with lifecycle policy              |
| `dashboard_config`       | Store dashboard JSON in cloud or S3                   |
