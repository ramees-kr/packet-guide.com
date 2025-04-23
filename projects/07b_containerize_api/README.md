# 📘 Project 07b – Containerize API

This project focuses on packaging the Simple API Service (from Project 07a) into a Docker container. This makes the application portable, ensures consistent environments, and prepares it for deployment in later phases using tools like Kubernetes.

---

## 🧭 Overview

Running applications directly on a host can lead to dependency conflicts and deployment inconsistencies ("it works on my machine"). Docker solves this by packaging the application, its dependencies, and runtime into a standardized unit: a container image.

This project involves:

- Writing a `Dockerfile` specific to the Simple API Service (Go or Python version).
- Building a Docker image containing the compiled application (for Go) or the application code and dependencies (for Python).
- Running the API service inside a Docker container locally.

---

## 🛠 Tech Stack

- **Docker:** For building and running containers.
- **Go or Python:** The language used for the Simple API Service in Project 07a.
- **Base Image:** Appropriate Docker base image (e.g., `golang:alpine`, `python:3.10-slim`).

---

## 🎯 Goals

1.  Learn the fundamentals of writing a `Dockerfile`.
2.  Understand Docker image layers and build process.
3.  Practice building Docker images (`docker build`).
4.  Learn how to run applications inside Docker containers (`docker run`), including port mapping.
5.  Create a portable and reproducible artifact for the API service.
6.  Prepare the API service for future deployment scenarios (CI/CD, Kubernetes).

---

## 🚀 Getting Started

**(Assuming the Simple API code from 07a is in `../07a_simple_api_service/` or a shared `apps/simple-api/` directory relative to this project folder)**

1.  **Navigate to the API service directory:**

    ```bash
    # Adjust the path based on your project structure
    cd ../07a_simple_api_service/
    # or cd ../../apps/simple-api/
    ```

2.  **Create the `Dockerfile`:** (See example snippet below) Place the `Dockerfile` in the root of the API service directory.

3.  **Build the Docker image:**

    ```bash
    # Replace 'yourusername/simple-api' with your desired image name:tag
    docker build -t yourusername/simple-api:v1 .
    ```

4.  **Run the containerized API service:**

    ```bash
    # Map host port 8080 to container port 8080 (adjust if your API uses a different port)
    docker run -p 8080:8080 yourusername/simple-api:v1
    ```

5.  **Test the API:** Access the API endpoints via `http://localhost:8080` (e.g., `http://localhost:8080/healthz`).

---

## ⚙️ Features

- ✅ `Dockerfile` defining the build steps for the API service.
- ✅ Multi-stage builds (especially for Go, to create smaller final images).
- ✅ Dependency management within the Dockerfile (e.g., `go mod download`, `pip install`).
- ✅ Exposes the correct port the API listens on (e.g., `EXPOSE 8080`).
- ✅ Defines the command to run the API service (`CMD` or `ENTRYPOINT`).

---

## 📄 Example Dockerfile Snippet (Go Example)

```dockerfile
# Stage 1: Build the application
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /simple-api main.go

# Stage 2: Create the final lightweight image
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
# Copy the compiled binary from the builder stage
COPY --from=builder /simple-api .
# Expose port 8080 to the outside world
EXPOSE 8080
# Command to run the executable
CMD ["./simple-api"]
```

_(Note: A Python version would typically copy `requirements.txt`, run `pip install`, copy the source code, and use `CMD ["python", "app.py"]` or similar.)_

---

## 📂 Project Structure

This project primarily adds a `Dockerfile` to the existing API service directory structure.

**Example (if API lives in `apps/simple-api/`):**

```text
[packet-guide.com/](https://packet-guide.com/)
├── apps/
│   └── simple-api/
│       ├── main.go         # or app.py
│       ├── handlers.go     # etc.
│       ├── go.mod          # or requirements.txt
│       └── Dockerfile      # <--- Added by this project
├── projects/
│   ├── 07a_simple_api_service/
│   │   └── README.md
│   └── 07b_containerize_api/
│       └── README.md       # <--- This file
└── ...
```

---

## 🧠 What I Learned

- Dockerfile syntax and common instructions (`FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `CMD`).
- The concept of Docker image layers and build caching.
- How to build minimal container images using multi-stage builds.
- Running and managing containers locally (`docker run`, `docker ps`, `docker stop`).
- Importance of containerization for application deployment consistency.

---

## 🔁 Next Steps

1.  Push the built Docker image to a container registry (e.g., Docker Hub, GitHub Container Registry).
2.  Integrate the Docker build process into a CI/CD pipeline (Project 15a).
3.  Deploy the containerized API service to Kubernetes (Project 17).
4.  Scan the image for vulnerabilities using tools like Trivy or Snyk.

---

## ✍️ Related Blog Ideas

- _Containerizing My First Go/Python API with Docker_
- _Dockerfile Best Practices for Simple Web Services_
- _Why Dockerfiles are Essential for Modern DevOps Workflows_
