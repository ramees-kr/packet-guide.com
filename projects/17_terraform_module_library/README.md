# 📘 Project 17 – Terraform Module Library

This project builds a set of reusable Terraform modules that encapsulate common infrastructure components — such as DNS records, monitoring exporters, alert routes, and cloud resources — with sensible defaults, input validation, and documentation.

These modules form the foundation of repeatable, scalable infrastructure-as-code.

---

## 🧭 Overview

Terraform modules allow you to define infrastructure as reusable, versioned components. You can abstract repetitive blocks and apply consistent design patterns across environments.

In this project you will:

- Write parameterized modules for DNS, exporters, and alerting
- Document module usage via README and examples
- Enforce input validation and output consistency
- Test module behavior using terraform plan and CI

You’ll be creating a “packet-guide-terraform-library” — usable for personal projects and real deployments.

---

## 🛠 Tech Stack

- Terraform v1.5+
- HCL2 syntax
- Pre-commit hooks (tflint, tfsec, terraform fmt)
- Optional: Terratest (Go), Checkov for policy
- GitHub/GitLab repository for version control

---

## 🎯 Goals

- Build modular, reusable Terraform code
- Learn how to define inputs, outputs, and validation
- Standardize infra components like DNS records or dashboards
- Use modules across multiple projects with confidence
- (Optional) Publish modules to Terraform Registry or internal registry

---

## 📂 Project Structure

```
modules/
├── dns_record/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── README.md
├── exporter/
│   └── ...
├── pagerduty_route/
│   └── ...
examples/
├── dns_record/
│   ├── main.tf
│   └── terraform.tfvars
tests/
├── basic_dns_test.tf
.git/
.pre-commit-config.yaml
README.md
```

---

## 📄 Sample Module: dns_record

📁 modules/dns_record/variables.tf:

```hcl
variable "zone_id" {
  type        = string
  description = "Cloudflare or AWS Route53 zone ID"
}

variable "name" {
  type        = string
  description = "Record name (e.g., 'dev')"
}

variable "value" {
  type        = string
  description = "IP address or CNAME target"
}

variable "type" {
  type        = string
  default     = "A"
  description = "Record type (A, CNAME, TXT)"
}
```

📁 modules/dns_record/main.tf:

```hcl
resource "cloudflare_record" "this" {
  zone_id = var.zone_id
  name    = var.name
  value   = var.value
  type    = var.type
  ttl     = 300
}
```

📁 modules/dns_record/outputs.tf:

```hcl
output "record_id" {
  value = cloudflare_record.this.id
}
```

---

## 🚀 Using a Module

📁 examples/dns_record/main.tf:

```hcl
module "dev_dns" {
  source  = "../../modules/dns_record"
  zone_id = var.zone_id
  name    = "dev"
  value   = "10.0.0.5"
}
```

---

## 🧠 What I Learned

To reflect post-project:

- Module input validation and defaulting
- Module interface design (variables, outputs, documentation)
- Making modules usable without hardcoding provider config
- Best practices for module directory structure and testing

---

## 🔁 Next Steps

- Add module versions and changelogs
- Create public or internal registry with git tags
- Add CI checks: terraform validate, tfsec, tflint
- Write module usage documentation
- Refactor existing Packet Guide Terraform into modules

---

## ✍️ Related Blog Ideas

- “Building a Terraform Module Library From Scratch”
- “How Reusable Modules Saved Me Hours of DevOps Time”
- “Why Every Infra Team Should Write Their Own Module Registry”

---

## 📦 Suggested Modules to Build

| Module Name      | Purpose                                   |
| ---------------- | ----------------------------------------- |
| dns_record       | Create A/CNAME/TXT records                |
| pagerduty_route  | Define routing keys or escalation policy  |
| exporter_service | Deploy Prometheus exporters via Terraform |
| dashboard_config | Store dashboard JSON into cloud or S3     |
| logging_bucket   | Create log storage + lifecycle policy     |
