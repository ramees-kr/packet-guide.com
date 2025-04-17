# 📘 Project 15 – Kubernetes DNS Exploration

This hands-on project explores how DNS resolution works inside Kubernetes. You’ll investigate how CoreDNS is configured, how Pods resolve service names, and how to debug DNS-related issues using tools like `nslookup`, `dig`, and `tcpdump`.

You’ll build a mini lab using Minikube or Kind and deploy test workloads to simulate real-world name resolution problems.

---

## 🧭 Overview

Kubernetes relies heavily on DNS — for service discovery, internal communication, and hostname-based routing.

This project focuses on:

- Understanding the CoreDNS setup inside K8s
- Testing how service names resolve (ClusterIP, FQDNs, headless services)
- Debugging common issues with service DNS failures
- Capturing internal DNS traffic for observability and root cause analysis

You’ll use actual tools (busybox, dnsutils, dig, etc.) inside real Pods to verify how DNS works in practice.

---

## 🛠 Tech Stack

- Kubernetes (Minikube, Kind, or real cluster)
- CoreDNS
- Busybox, dnsutils
- tcpdump, Wireshark (optional)
- kubectl, YAML manifests
- Optional:
  - Lens or k9s for cluster browsing

---

## 🎯 Goals

- Deploy test pods and services to test DNS lookups
- Understand how kube-dns/CoreDNS resolves service names
- Learn how to troubleshoot resolution issues
- Explore service name formats (FQDN, shortname, namespace-qualified)
- Use tcpdump to inspect internal DNS traffic

---

## 🚀 Getting Started

1. Start a local cluster:

```bash
minikube start
```

2. Deploy a test pod with dig:

```bash
kubectl run digger --image=busybox:1.35.0 --restart=Never -it -- /bin/sh
```

3. Try resolving a service:

```sh
nslookup kubernetes.default
nslookup my-service.my-namespace.svc.cluster.local
```

4. Deploy a headless service:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-headless
spec:
  clusterIP: None
  selector:
    app: my-app
  ports:
    - port: 80
```

5. Exec into Pod:

```bash
kubectl exec digger -- nslookup my-headless
```

---

## 📂 Project Structure

```
manifests/
├── headless-service.yaml
├── test-pod.yaml
scripts/
└── tcpdump_dns.sh          # capture DNS inside Pod or Node
README.md
```

---

## 🧠 What I Learned

To reflect post-exploration:

- How Kubernetes sets up DNS for each Pod (via /etc/resolv.conf)
- What happens when CoreDNS is misconfigured
- How to debug failed name resolution inside a cluster
- How service discovery differs across service types (ClusterIP vs Headless)
- DNS propagation timing inside K8s

---

## 🔁 Next Steps

- Write a troubleshooting playbook for DNS failures
- Run tcpdump on kube-dns or CoreDNS Pod
- Explore kube-dns metrics with Prometheus
- Inject DNS failures to test resiliency

---

## ✍️ Related Blog Ideas

- “Inside Kubernetes DNS: A Guided Exploration”
- “Why My Pod Couldn’t Find Another: Debugging DNS in K8s”
- “How Headless Services Use DNS Differently”
- “Visualizing CoreDNS Traffic with tcpdump and Grafana”

---

## 🧪 Sample Commands

List CoreDNS Pods:

```bash
kubectl get pods -n kube-system -l k8s-app=kube-dns
```

Check /etc/resolv.conf in Pod:

```bash
kubectl exec digger -- cat /etc/resolv.conf
```

Try FQDN resolution:

```bash
kubectl exec digger -- nslookup api-service.default.svc.cluster.local
```
