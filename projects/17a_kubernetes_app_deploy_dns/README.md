# 📘 Project 17a – K8s App Deploy & DNS

This hands-on project focuses on deploying the containerized Simple API Service (from Project 07b) into a local Kubernetes cluster (Minikube/Kind) using basic Deployment and Service objects. We will verify the application's deployment, internal accessibility, and explore the Kubernetes DNS mechanisms (CoreDNS) used for service discovery.

---

## 🧭 Overview

Deploying directly onto VMs doesn’t scale and lacks orchestration. Kubernetes provides a robust container orchestration platform.

This project covers:

- Writing Deployment and Service YAML manifests for the Simple API Service
- Managing Pod replicas with a Deployment
- Exposing the API internally via a ClusterIP Service
- Verifying deployment status with `kubectl`
- Exploring how CoreDNS enables pods to discover the API service
- Testing internal DNS resolution using `nslookup` or `dig` from within the cluster

_(External HTTPS exposure is covered in Project 17b.)_

---

## 🛠 Tech Stack

- Kubernetes (Minikube or Kind)
- `kubectl`
- Docker (API image from Project 07b)
- YAML manifests
- CoreDNS
- Busybox/dnsutils for in-cluster debugging
- Optional: Lens or k9s

---

## 🎯 Goals

1. Learn Deployment and Service objects
2. Write YAML manifests for Kubernetes
3. Deploy the Simple API Service to Kubernetes
4. Expose it internally with a ClusterIP Service
5. Verify pods and service status/logs
6. Understand internal DNS via CoreDNS
7. Test DNS resolution from other Pods
8. Use `kubectl` for deployment and troubleshooting

---

## 🚀 Getting Started

1. **Start a local cluster**
   ```bash
   minikube start
   # or
   kind create cluster
   ```
2. **Load the API image**
   ```bash
   # Minikube
   minikube image load yourusername/simple-api:v1
   # Kind
   kind load docker-image yourusername/simple-api:v1
   ```
3. **Create manifests** (`manifests/deployment.yaml`, `manifests/service.yaml`)
4. **Apply manifests**
   ```bash
   kubectl apply -f manifests/deployment.yaml
   kubectl apply -f manifests/service.yaml
   ```
5. **Verify deployment**
   ```bash
   kubectl get pods -l app=simple-api
   kubectl get svc simple-api-service
   ```
6. **Test internal access**
   ```bash
   kubectl port-forward service/simple-api-service 8080:8080
   # http://localhost:8080
   ```
7. **Test internal DNS**
   ```bash
   kubectl run dns-test --image=npmccallum/dnsutils --restart=Never -it --rm -- /bin/sh
   nslookup simple-api-service
   nslookup simple-api-service.default.svc.cluster.local
   wget -O - http://simple-api-service:8080/healthz
   exit
   ```

---

## 📄 Example Manifests

**manifests/deployment.yaml**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: simple-api-deployment
  labels:
    app: simple-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: simple-api
  template:
    metadata:
      labels:
        app: simple-api
    spec:
      containers:
        - name: simple-api
          image: yourusername/simple-api:v1
          ports:
            - containerPort: 8080
```

**manifests/service.yaml**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: simple-api-service
spec:
  selector:
    app: simple-api
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
  type: ClusterIP
```

---

## 📂 Project Structure

```text
manifests/
├── deployment.yaml    # Deployment manifest
├── service.yaml       # ClusterIP Service manifest
└── test-pod.yaml      # Optional DNS test pod
README.md              # This file (17a)
```

---

## 🧠 What I Learned

- Writing Deployment and Service manifests
- Relationship between Deployments, ReplicaSets, and Pods
- ClusterIP Service for internal endpoints
- Using `kubectl` to apply, inspect, log, and debug
- CoreDNS auto-creates DNS records for Services
- Pod DNS resolution by name and FQDN
- Basic Kubernetes networking and service discovery

---

## 🔁 Next Steps

- Scale the deployment (`kubectl scale deployment simple-api-deployment --replicas=<n>`)
- Implement rolling updates
- Add resource requests/limits
- Configure readiness and liveness probes
- Proceed to Project 17b for Ingress & HTTPS
- Deploy Prometheus exporter (Project 12) into Kubernetes

---

## ✍️ Related Blog Ideas

- _Deploying Your First Containerized App to Kubernetes (Minikube)_
- _Kubernetes Deployments vs Services: A Practical Explanation_
- _Understanding Kubernetes Internal Service Discovery and CoreDNS_
- _Debugging Application Connectivity Inside Kubernetes_

---

## 🧪 Sample `kubectl` Commands

```bash
kubectl apply -f manifests/
kubectl get pods -l app=simple-api -w
kubectl get svc simple-api-service
kubectl describe svc simple-api-service
kubectl get deployment simple-api-deployment
kubectl rollout status deployment/simple-api-deployment
kubectl logs -l app=simple-api --tail=50
kubectl describe pod <pod-name>
kubectl port-forward service/simple-api-service 8080:8080
kubectl run dns-test --image=npmccallum/dnsutils --restart=Never -it --rm -- /bin/sh
```
