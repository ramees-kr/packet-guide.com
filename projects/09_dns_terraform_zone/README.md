# 📘 Project 09 – DNS Terraform Zone

This project defines and deploys a complete DNS zone (domain) using Terraform — including A, CNAME, and potentially TXT records — using a cloud provider like Cloudflare, AWS Route53, or a local Bind9 provider.

It introduces declarative DNS-as-Code with Terraform and helps you begin thinking about reproducible infrastructure, state management, and Git-driven changes.

---

## 🧭 Overview

Manual DNS updates are slow, error-prone, and untraceable. Modern infra teams use Infrastructure as Code (IaC) tools like Terraform to:

- Create & manage DNS zones and records declaratively
- Track every change in version control
- Test changes before applying
- Roll back when needed

This project focuses on managing DNS records in a cloud DNS provider using a Terraform module. It may evolve into a reusable template for future projects or even GitOps workflows (Phase 4).

---

## 🛠 Tech Stack

- Terraform (v1.5+)
- Cloud DNS Provider (choose one):
  - ✅ Cloudflare (terraform-provider-cloudflare)
  - 🟡 AWS Route53 (terraform-provider-aws)
  - 🔧 Optional: Bind9 via Terraform plugin (advanced)
- Optional:
  - tfenv or direnv for version pinning
  - Git for state tracking
  - tfsec or checkov for policy checks

---

## 🎯 Goals

- Learn how DNS zones and records are represented in HCL
- Define A, CNAME, and TXT records using IaC
- Work with Terraform providers and resources
- Manage multiple environments (dev, prod)
- Think declaratively and modularly

---

## 🚀 Getting Started

1. Install Terraform:

```bash
brew install terraform         # macOS
sudo apt install terraform     # Debian/Ubuntu
```

2. Configure provider (Cloudflare example):

```hcl
provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
```

3. Define your zone & records:

```hcl
resource "cloudflare_zone" "example" {
  zone = "packet-guide.com"
}

resource "cloudflare_record" "dev" {
  zone_id = cloudflare_zone.example.id
  name    = "dev"
  type    = "A"
  value   = "192.168.1.100"
  ttl     = 120
}
```

4. Run Terraform:

```bash
terraform init
terraform plan
terraform apply
```

---

## 📄 Directory Structure

```
main.tf                # Root module definition
variables.tf           # Input vars like zone, records, TTL
outputs.tf             # Useful outputs (e.g., zone_id)
terraform.tfvars       # Your actual config values
envs/
├── dev/
│   ├── main.tfvars
│   └── overrides.tf
├── prod/
│   └── ...
modules/
└── dns_zone/          # Reusable DNS zone module
README.md              # You're here
```

---

## 🧪 Sample Variables

variables.tf:

```hcl
variable "zone_name" {
  description = "The DNS zone name"
  type        = string
}

variable "records" {
  description = "A list of DNS records"
  type = list(object({
    name = string
    type = string
    value = string
    ttl = number
  }))
}
```

terraform.tfvars:

```hcl
zone_name = "packet-guide.com"
records = [
  {
    name  = "dev"
    type  = "A"
    value = "10.0.0.5"
    ttl   = 120
  },
  {
    name  = "www"
    type  = "CNAME"
    value = "dev.packet-guide.com"
    ttl   = 300
  }
]
```

---

## 🧠 What I Learned

To reflect after completion:

- Terraform resource lifecycle (create, destroy, import)
- Cloudflare or AWS API structure for DNS
- How DNS records can be modularized
- Version control + IaC = reproducibility
- Gotchas with Terraform state files

---

## 🔁 Next Steps

- Add validation rules (e.g., record format checks)
- Split out DNS zones by environment
- Make the DNS module reusable (e.g., for GitOps DNS repo in Phase 4)
- Add pre-commit hooks or CI to run terraform plan

---

## ✍️ Related Blog Ideas

- “DNS-as-Code: My First Terraform Zone Deployment”
- “What I Learned Using Terraform to Manage Cloudflare DNS”
- “From Bash to HCL: Automating Infrastructure with Terraform”
