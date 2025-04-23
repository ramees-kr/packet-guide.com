# 📘 Project 19 – Terraform Module Library

This project builds a set of reusable Terraform modules that encapsulate common infrastructure components—such as DNS records, Kubernetes resources (Deployments, Services, Ingress), cert-manager configurations, monitoring exporters, alert routes, and cloud resources—with sensible defaults, input validation, and documentation.

These modules form the foundation of repeatable, scalable infrastructure-as-code for both cloud and Kubernetes environments within the Packet Guide project.

---

## 🧭 Overview

Terraform modules allow you to define infrastructure as reusable, versioned components. You can abstract repetitive patterns—like DNS record sets, standard Kubernetes deployments, or cert-manager issuers—and apply consistent design across environments or applications.

In this project you will:

- Write parameterized modules for DNS, Kubernetes application deployments, Ingress resources, cert-manager issuers, and more
- Document module usage via README files and examples
- Enforce input validation and output consistency
- Test module behavior using `terraform plan` and (optionally) CI checks

You'll extend the “packet-guide-terraform-library”—usable for personal projects and real deployments, covering both traditional infrastructure and Kubernetes configurations.

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
├── exporter/
│   └── ...
├── pagerduty_route/
│   └── ...
examples/                         # Usage examples for each module
├── dns_record/
│   └── ...
├── k8s_app_deployment/
│   ├── main.tf
│   └── terraform.tfvars
tests/                            # Basic validation tests
├── basic_dns_test.tf
├── basic_k8s_deploy_test.tf
.pre-commit-config.yaml
README.md                         # This file (Project 19)
```

---

## 📄 Sample Module: `k8s_app_deployment`

### `modules/k8s_app_deployment/variables.tf`

```hcl
variable "image_name" {
  type = string
}
variable "image_tag" {
  type = string
}
variable "replicas" {
  type    = number
  default = 1
}
variable "namespace" {
  type = string
}
variable "app_name" {
  type = string
}
variable "container_port" {
  type = number
}
# ... other inputs like labels, resource limits, env vars ...
```

### `modules/k8s_app_deployment/main.tf`

```hcl
resource "kubernetes_deployment" "app" {
  metadata {
    name      = "${var.app_name}-deployment"
    namespace = var.namespace
    labels    = { App = var.app_name }
  }
  spec {
    replicas = var.replicas
    selector {
      match_labels = { App = var.app_name }
    }
    template {
      metadata {
        labels = { App = var.app_name }
      }
      spec {
        container {
          name  = var.app_name
          image = "${var.image_name}:${var.image_tag}"
          port {
            container_port = var.container_port
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "app" {
  metadata {
    name      = "${var.app_name}-service"
    namespace = var.namespace
  }
  spec {
    selector = { App = var.app_name }
    port {
      port        = var.container_port
      target_port = var.container_port
    }
    type = "ClusterIP"
  }
}
```

---

## 🚀 Using a Kubernetes Module

### `examples/k8s_app_deployment/main.tf`

```hcl
provider "kubernetes" {
  # Configuration options
}

module "simple_api_deployment" {
  source         = "../../modules/k8s_app_deployment"
  app_name       = "simple-api"
  namespace      = "default"
  image_name     = "yourusername/simple-api"
  image_tag      = "v1"
  replicas       = 2
  container_port = 8080
}
```

---

## 🧠 What I Learned

- Module input validation and default values
- Designing module interfaces (variables, outputs, documentation)
- Allowing user-configured provider settings via aliases
- Best practices for module directory structure and testing
- Wrapping Kubernetes resources within Terraform HCL using the Kubernetes provider
- Parameterizing Kubernetes resources effectively in Terraform modules
- Trade-offs of managing Kubernetes via Terraform modules vs. Helm or raw YAML

---

## 🔁 Next Steps

- Tag modules with versions and maintain changelogs
- Publish modules to a registry (Terraform Registry or internal)
- Add CI checks: `terraform validate`, `tfsec`, `tflint`
- Write comprehensive usage docs in each module’s `README.md`
- Refactor existing Packet Guide infrastructure (Project 10 & 17a/17b) to consume these modules
- Explore Helm provider modules for chart deployments

---

## ✍️ Related Blog Ideas

- _Building a Terraform Module Library From Scratch_
- _How Reusable Modules Saved Me Hours of DevOps Time_
- _Why Every Infra Team Should Write Their Own Module Registry_
- _Terraform Modules for Kubernetes: Best Practices and Patterns_
- _Managing Kubernetes Deployments and Services with Reusable Terraform Modules_
- _Creating a Terraform Module for cert-manager ClusterIssuers_

---

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
