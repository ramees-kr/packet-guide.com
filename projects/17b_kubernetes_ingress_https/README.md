# 📘 Project 17b – K8s Ingress & HTTPS

Building upon the internal deployment from Project 17a, this project focuses on exposing the Simple API Service externally and securing it with HTTPS using an Ingress controller, cert-manager, and automated Let’s Encrypt certificates.

---

## 🧭 Overview

Having an application running inside Kubernetes is useful, but you often need secure external access. This project covers:

- Installing and configuring an Ingress controller (e.g., Nginx)
- Installing cert-manager for automated TLS lifecycle management
- Setting up a ClusterIssuer to request certificates from Let’s Encrypt
- Creating an Ingress resource to route HTTPS traffic to the Simple API Service
- Verifying certificate issuance and HTTPS access

---

## 🛠 Tech Stack

- Kubernetes (Minikube or Kind)
- `kubectl`
- Ingress Controller: Nginx Ingress (or Traefik)
- cert-manager
- Let’s Encrypt (ACME)
- YAML manifests
- Helm (optional) for installing Nginx and cert-manager

---

## 🎯 Goals

1. Understand Kubernetes Ingress controllers
2. Learn how cert-manager automates TLS issuance and renewal
3. Install and configure Nginx Ingress controller
4. Install and configure cert-manager
5. Create a ClusterIssuer for Let’s Encrypt (staging and production)
6. Define an Ingress resource with TLS annotations
7. Access the API over HTTPS with a valid certificate

---

## ✅ Prerequisites

- Completion of Project 17a: Deployment & internal DNS of the Simple API Service
- Ability to add DNS entries or edit `/etc/hosts` for testing hostnames

---

## 🚀 Getting Started

1. **Install Nginx Ingress Controller**

   ```bash
   helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
   helm repo update
   helm install ingress-nginx ingress-nginx/ingress-nginx \
     --namespace ingress-nginx --create-namespace
   kubectl get pods -n ingress-nginx
   ```

2. **Install cert-manager**

   ```bash
   helm repo add jetstack https://charts.jetstack.io
   helm repo update
   helm install cert-manager jetstack/cert-manager \
     --namespace cert-manager --create-namespace \
     --version v1.11.0 --set installCRDs=true
   kubectl get pods -n cert-manager
   ```

3. **Configure ClusterIssuer**

   ```bash
   kubectl apply -f manifests/clusterissuer.yaml
   kubectl get clusterissuer
   ```

4. **Create Ingress Resource**

   ```bash
   kubectl apply -f manifests/ingress.yaml -n <your-namespace>
   kubectl get ingress -n <your-namespace>
   ```

5. **Configure DNS / Hosts File**

   - Minikube:
     ```bash
     echo "$(minikube ip) api.packet-guide.local" | sudo tee -a /etc/hosts
     ```
   - Cloud: update your DNS provider to point `api.packet-guide.local` at the Ingress IP.

6. **Verify Certificate Issuance**

   ```bash
   kubectl get certificate -n <your-namespace>
   kubectl describe certificate simple-api-tls -n <your-namespace>
   kubectl get challenge -n <your-namespace>
   kubectl describe ingress simple-api-ingress -n <your-namespace>
   ```

7. **Access via HTTPS**  
   Open `https://api.packet-guide.local` in your browser and inspect the certificate.

---

## 📄 Example Manifests

**manifests/clusterissuer.yaml**

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-staging-private-key
    solvers:
      - http01:
          ingress:
            class: nginx
```

**manifests/ingress.yaml**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: simple-api-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-staging
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - api.packet-guide.local
      secretName: simple-api-tls
  rules:
    - host: api.packet-guide.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: simple-api-service
                port:
                  number: 8080
```

---

## 📂 Project Structure

```text
manifests/
├── clusterissuer.yaml   # cert-manager ClusterIssuer for Let’s Encrypt
├── ingress.yaml         # Ingress resource with TLS settings
README.md                # Project 17b documentation
```

---

## 🧠 What I Learned

- Role of Ingress controllers for external traffic
- Automating TLS with cert-manager
- Difference between Issuer and ClusterIssuer
- Configuring cert-manager for Let’s Encrypt (ACME)
- Defining Ingress resources for HTTP→HTTPS routing
- Troubleshooting ACME challenges and certificates

---

## 🔁 Next Steps

- Switch to Let’s Encrypt production ClusterIssuer
- Explore DNS01 challenge for wildcard certificates
- Create a Terraform module for cert-manager and Ingress (Project 19)
- Monitor certificate expiry via Prometheus metrics
- Add advanced Ingress rules (path-based routing, redirects)

---

## ✍️ Related Blog Ideas

- Securing Kubernetes Services with HTTPS via Nginx Ingress & Let’s Encrypt
- Automating TLS in Kubernetes with cert-manager
- Kubernetes Ingress Explained: From HTTP to HTTPS
- Troubleshooting Let’s Encrypt Challenges in Kubernetes

---

## 🧪 Sample `kubectl` Commands

```bash
# Ingress & cert-manager pods
kubectl get pods -n ingress-nginx
kubectl get pods -n cert-manager

# Apply manifests
kubectl apply -f manifests/clusterissuer.yaml
kubectl apply -f manifests/ingress.yaml -n <your-namespace>

# Inspect resources
kubectl get clusterissuer
kubectl get ingress -n <your-namespace>
kubectl get certificate -n <your-namespace>
kubectl get secret simple-api-tls -n <your-namespace>

# Describe for details/events
kubectl describe clusterissuer letsencrypt-staging
kubectl describe ingress simple-api-ingress -n <your-namespace>
kubectl describe certificate simple-api-tls -n <your-namespace>

# Check logs
kubectl logs -l app=cert-manager -n cert-manager --tail=100
kubectl logs -l app.kubernetes.io/name=ingress-nginx -n ingress-nginx --tail=100
```
