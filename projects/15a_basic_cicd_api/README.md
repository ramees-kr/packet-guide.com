# 📘 Project 15a – Basic CI/CD for API Service

This project focuses on establishing a fundamental Continuous Integration (CI) pipeline for the Simple API Service (Project 07a/07b). The goal is to automate testing and building the Docker container image whenever changes are pushed to the repository.

---

## 🧭 Overview

Manually testing code and building container images for every change is time-consuming and prone to errors. Continuous Integration automates these steps, providing faster feedback and ensuring consistency.

This project involves:

- Choosing a CI/CD platform (e.g., GitHub Actions, GitLab CI)
- Writing a pipeline configuration file (YAML)
- Defining pipeline stages/jobs for:
  - Checking out the source code
  - Setting up the language environment (Go or Python)
  - Running automated tests (unit tests from Project 07a)
  - Building the Docker image (using the Dockerfile from Project 07b)
- Triggering the pipeline automatically on code pushes or pull requests

---

## 🛠 Tech Stack

- CI/CD platform: GitHub Actions or GitLab CI
- Configuration language: YAML
- Scripting: Bash/Shell commands within pipeline steps
- Testing framework: Go testing library (`go test`) or Python (`pytest`)
- Containerization: Docker
- Source code management: Git

---

## 🎯 Goals

1. Learn the core concepts of Continuous Integration
2. Understand CI pipeline structure (workflows, jobs, steps, triggers)
3. Practice writing CI pipeline configuration in YAML
4. Automate unit tests for the API service on every code change
5. Automate building the API service’s Docker container image
6. Gain experience with a CI/CD platform (GitHub Actions or GitLab CI)
7. Improve code quality and build reliability through automation

---

## 🚀 Getting Started

1. Choose a CI/CD platform
2. Create the pipeline configuration file:
   - GitHub Actions: `.github/workflows/ci.yml`
   - GitLab CI: `.gitlab-ci.yml`
3. Define pipeline steps: checkout, setup, test, build
4. Commit and push the workflow file to the repository
5. Trigger the pipeline by pushing changes or opening a pull request
6. Monitor execution status and logs in the CI/CD interface

---

## ⚙️ Pipeline Stages

- ✅ Trigger: runs on push to `main` and on pull requests
- ✅ Checkout: fetch the latest code
- ✅ Setup: install Go or Python and dependencies
- ✅ Test: run unit tests (`go test ./...` or `pytest`)
- ✅ Build: build the Docker image using the `Dockerfile`
- 🟡 (Optional) Push: push the image to a container registry (requires credentials)

---

## 📄 Example Pipeline Snippet (GitHub Actions)

```yaml
name: Simple API CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Go
        uses: actions/setup-go@v3
        with:
          go-version: "1.21"

      - name: Run unit tests
        run: |
          cd apps/simple-api
          go test -v ./...

      - name: Build Docker image
        run: |
          cd apps/simple-api
          docker build -t yourusername/simple-api:${{ github.sha }} .
```

_Note: A Python version would use `actions/setup-python`, `pip install`, and `pytest`._

---

## 📂 Project Structure

```text
packet-guide.com/
├── .github/
│   └── workflows/
│       └── ci.yml
├── apps/
│   └── simple-api/
│       ├── main.go (or app.py)
│       ├── Dockerfile
│       └── ... (API code & tests)
├── projects/
│   └── 15a_basic_cicd_api/
│       └── README.md
└── ...
```

---

## 🧠 What I Learned

- The purpose and benefits of Continuous Integration
- How to define CI workflows in YAML for GitHub Actions or GitLab CI
- Common pipeline patterns: checkout, setup, test, build
- Integrating testing frameworks into a pipeline
- Automating Docker image builds in a CI environment
- Importance of triggers and monitoring workflow execution

---

## 🔁 Next Steps

1. Add a linting step to check code style
2. Add a security scanning step (e.g., Trivy, Snyk, CodeQL)
3. Add a push step to publish the Docker image to a registry
4. Explore Continuous Deployment to Kubernetes (Project 17)
5. Implement caching for dependencies or Docker layers

---

## ✍️ Related Blog Ideas

- _Setting Up My First CI Pipeline with GitHub Actions or GitLab CI_
- _Automating Tests and Docker Builds for My Go/Python API_
- _From Manual to Automated: The Power of Continuous Integration_
- _CI/CD Basics for DevOps Beginners_
