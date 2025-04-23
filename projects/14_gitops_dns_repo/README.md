# 📘 Project 14 – GitOps DNS Repo

A Git-backed repository that defines and manages DNS zones and their DNSSEC configurations using Terraform, version control, and GitOps workflows.

This project focuses on treating DNS (including its security settings) as a version-controlled, declarative, reviewable system — where every DNS change, including enabling/disabling DNSSEC or modifying related records, goes through Git and CI/CD.

---

## 🧭 Overview

Manual DNS updates via UI or CLI don’t scale and lack auditability. GitOps fixes this by:

- Defining all DNS zones, records, and DNSSEC settings (from Project 10) in Terraform
- Storing the entire desired DNS state in a Git repository
- Using CI/CD pipelines (or manual approval) to validate (`terraform plan`) and apply (`terraform apply`) changes
- Ensuring that changes to DNSSEC configurations follow the same rigorous review and automated checks as standard record changes
- Optionally using ArgoCD or Terraform Cloud for deployment orchestration

This project will mirror real-world patterns for:

- Infrastructure DNS and security
- Internal service discovery
- Multi-environment rollouts with consistent configurations

---

## 🛠 Tech Stack

- Terraform v1.5+ (with provider supporting DNSSEC, e.g., Cloudflare)
- Git
- Cloud provider (Cloudflare, Route 53)
- GitHub / GitLab (or other Git platform with CI/CD)
- Optional:
  - Terraform Cloud or Atlantis for PR automation/state management
  - ArgoCD (for Kubernetes integration)
  - CI/CD tools (GitHub Actions, GitLab CI, Jenkins)

---

## 🎯 Goals

- Build a Git-first repo to manage DNS state including DNSSEC
- Use pull requests for all DNS changes (records and security settings)
- Ensure DNSSEC configuration changes are visible in `terraform plan` output during PR review
- Track, review, and revert DNS changes (including DNSSEC state) with history
- Work with multiple environments (dev, prod) maintaining consistent security posture
- Prepare for future GitOps controller integration

---

## 📄 Example DNS Record Change (in Git PR)

A pull request might modify `dns.tf` to change an IP or enable DNSSEC:

```diff
# environments/prod/dns.tf

resource "cloudflare_record" "api_prod" {
  zone_id = cloudflare_zone.packet_guide_prod.id
  name    = "api"
  type    = "A"
- value   = "192.168.10.5"
+ value   = "192.168.10.6"
  ttl     = 120
  proxied = false
}

# Enable DNSSEC if not already defined
+resource "cloudflare_zone_dnssec" "prod_dnssec" {
+  zone_id = cloudflare_zone.packet_guide_prod.id
+}
```

The CI `terraform plan` step in the PR will show the planned change to the A record and the creation/modification of the DNSSEC resource.

---

## 📂 Project Structure

```text
environments/
├── dev/
│   ├── dns.tf          # Includes records & dnssec resources
│   ├── variables.tf
│   └── terraform.tfvars
├── prod/
│   ├── dns.tf          # Includes records & dnssec resources
│   └── terraform.tfvars
modules/
└── dns_zone/           # Supports enabling/disabling DNSSEC
    ├── main.tf
    ├── variables.tf
    └── outputs.tf
.gitops/
├── pre-commit-check.sh
└── ci/
    ├── terraform-validate.yml  # Runs terraform validate
    └── terraform-plan.yml      # Runs terraform plan on PRs
README.md
```

---

## 🚀 Getting Started

1. Clone the repo (standalone or monorepo):

   ```bash
   git clone https://github.com/your-username/packet-guide.com.git
   cd packet-guide.com/projects/14_gitops_dns_repo
   ```

2. Set up Terraform and secrets (ensure provider supports DNSSEC):

   ```bash
   export CLOUDFLARE_API_TOKEN="..."
   terraform init
   ```

3. Make changes on a feature branch (e.g., add a record or modify DNSSEC settings in `.tf` files).

4. Push branch and open a Pull Request.

5. Review CI output: verify `terraform plan` shows intended changes to records and DNSSEC status.

6. Approve and merge the PR.

7. CI/CD (or manual step) runs `terraform apply` on the main branch.

---

## 🔁 GitOps Workflow Example (with DNSSEC)

```mermaid
graph LR
  A[Dev pushes PR modifying dns.tf (records or DNSSEC)] --> B[CI: terraform plan]
  B --> C[Team reviews plan output (checks record AND DNSSEC changes)]
  C --> D[CI: terraform apply on main branch]
  D --> E[DNS records AND DNSSEC state updated via provider API]
```

---

## 🧠 What I Learned

- How Git serves as an infrastructure change ledger for records and security settings
- Best practices for Terraform folder structure in a GitOps context
- Incorporating DNSSEC management into a GitOps review process
- Importance of reviewing `terraform plan` output for security configuration changes
- DNS rollout strategies (TTL changes, gradual swaps)
- Versioning, testing, and rollback of DNS records and configurations

---

## ✍️ Related Blog Ideas

- _DNS as Git: What I Learned Moving to GitOps_
- _Building a Reviewable, Declarative DNS Workflow with Terraform_
- _Pull Requests for DNS? Yes Please._
- _Managing DNSSEC Securely with Terraform and GitOps_
- _Integrating DNS Security into Your CI/CD Pipeline_

---

## 🔁 Next Steps

- Add CI/CD for `validate` and `apply` (GitHub Actions, GitLab CI)
- Use Terraform Cloud workspaces per environment for state management and run execution
- Add post-apply checks in CI to verify DNSSEC status (e.g., `dig +dnssec @<resolver> <domain> SOA`)
- Add documentation generator for DNS zone layout, including DNSSEC status
- Integrate with ArgoCD (if managing Kubernetes alongside DNS)
