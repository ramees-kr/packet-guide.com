# 📘 Project 10 – DNS Terraform Zone & DNSSEC

This project defines and deploys a complete DNS zone (domain) using Terraform — including A, CNAME, and TXT records — on a cloud provider like Cloudflare or AWS Route 53. It also covers enabling and managing DNSSEC (Domain Name System Security Extensions) for the zone via Terraform.

It introduces declarative DNS-as-Code for both standard records and security extensions, helping you think about reproducible infrastructure, state management, DNS security, and Git-driven changes.

---

## 🧭 Overview

Manual DNS updates are slow, error-prone, and untraceable. Standard DNS is also vulnerable to spoofing and cache poisoning attacks. Infrastructure teams use Infrastructure as Code (IaC) tools like Terraform to:

- Create and manage DNS zones and records declaratively
- Enable and manage DNSSEC settings to ensure domain authenticity and integrity
- Track every change (including DNSSEC state) in version control
- Test changes before applying
- Roll back when needed

This project focuses on managing DNS records and DNSSEC in a cloud DNS provider using Terraform. It can evolve into a reusable template for future projects or GitOps workflows (Phase 4, Project 14).

---

## 🛠 Tech Stack

- Terraform (v1.5+)
- Cloud DNS Provider (choose one):
  - Cloudflare (`terraform-provider-cloudflare`, supports DNSSEC)
  - AWS Route 53 (`terraform-provider-aws`, may require additional DNSSEC resources)
- DNSSEC concepts: KSK (Key Signing Key), ZSK (Zone Signing Key), DS records, Chain of Trust
- Optional tools:
  - `tfenv` or `direnv` for version pinning
  - Git for state tracking
  - `tfsec` or `checkov` for policy checks

---

## 🎯 Goals

- Learn how DNS zones and records are defined in HCL
- Create A, CNAME, and TXT records with IaC
- Understand DNSSEC basics and its importance
- Enable and manage DNSSEC via Terraform resources
- Learn how DS records relate to registrars and parent zones
- Work with Terraform providers for DNS and DNSSEC
- Manage multiple environments (dev, prod)
- Think declaratively and modularly about DNS infrastructure and security

---

## 🚀 Getting Started

1. **Install Terraform**

   ```bash
   brew install terraform         # macOS
   sudo apt install terraform     # Debian/Ubuntu
   ```

2. **Configure provider** (Cloudflare example)

   ```hcl
   provider "cloudflare" {
     api_token = var.cloudflare_api_token
   }
   ```

3. **Define zone, records, and DNSSEC**

   ```hcl
   resource "cloudflare_zone" "example" {
     zone = "packet-guide.com"
   }

   resource "cloudflare_zone_dnssec" "example_dnssec" {
     zone_id = cloudflare_zone.example.id
   }

   resource "cloudflare_record" "dev" {
     zone_id = cloudflare_zone.example.id
     name    = "dev"
     type    = "A"
     value   = "192.168.1.100"
     ttl     = 120
   }
   ```

   > Note: Exact DNSSEC attributes vary by provider. Consult the Terraform provider docs.

4. **Run Terraform**
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```
   After applying, retrieve DS record details from your DNS provider or via Terraform output and add them to your domain registrar.

---

## 📄 Directory Structure

```text
.
├── main.tf             # Root module (zone, records, dnssec)
├── variables.tf        # Input variables (zone, records, TTL)
├── outputs.tf          # Outputs (zone_id, DS record details)
├── terraform.tfvars    # Configuration values
├── envs/
│   ├── dev/
│   │   ├── main.tfvars
│   │   └── overrides.tf
│   └── prod/
│       └── ...
├── modules/
│   └── dns_zone/       # Reusable DNS zone module (with DNSSEC option)
└── README.md           # This file
```

---

## 🧪 Sample Variables & Outputs

**variables.tf**

```hcl
variable "enable_dnssec" {
  description = "Enable DNSSEC for the zone"
  type        = bool
  default     = true
}
```

**outputs.tf**

```hcl
output "zone_id" {
  value = cloudflare_zone.example.id
}

output "dnssec_status" {
  description = "DNSSEC status for the zone"
  value       = cloudflare_zone_dnssec.example_dnssec.status
}

output "ds_record_details" {
  description = "DS record details for the registrar"
  value = {
    algorithm   = cloudflare_zone_dnssec.example_dnssec.ds_record.algorithm
    digest_type = cloudflare_zone_dnssec.example_dnssec.ds_record.digest_type
    digest      = cloudflare_zone_dnssec.example_dnssec.ds_record.digest
    key_tag     = cloudflare_zone_dnssec.example_dnssec.ds_record.key_tag
  }
}
```

---

## 🧠 What I Learned

- Terraform resource lifecycle (create, destroy, import)
- Cloudflare/AWS DNS API structure
- DNSSEC fundamentals (authentication, integrity)
- DNSSEC components (KSK, ZSK, DS records, RRSIG)
- Managing DNSSEC with Terraform (`cloudflare_zone_dnssec`, etc.)
- Providing DS records to registrars to complete the chain of trust
- Modularizing DNS infrastructure in Terraform
- Version control and reproducibility with IaC
- Terraform state file considerations

---

## 🔁 Next Steps

- Add validation rules (record format checks)
- Split DNS zones by environment
- Make the DNS module reusable with a DNSSEC toggle (Project 14)
- Add pre-commit hooks or CI for `terraform plan`
- Automate DS record updates at the registrar (via API or documented manual step)

---

## ✍️ Related Blog Ideas

- _DNS-as-Code: My First Terraform Zone Deployment_
- _Managing Cloudflare DNS with Terraform_
- _Automating DNSSEC Configuration with Terraform_
- _Securing Your Domain: DNSSEC via IaC_
