# 📘 Project 07a – Simple API Service

This project involves building a basic RESTful API service using either Go or Python. This serves as the sample application that will be containerized, deployed, monitored, and managed using the infrastructure tools built throughout the Packet Guide journey.

---

## 🧭 Overview

To effectively learn infrastructure automation and observability, it's crucial to have a target application. This project creates a simple, stateless (or minimally stateful) API service that simulates a real-world microservice.

The API provides basic functionality (e.g., CRUD operations on an in-memory data store or simple computations) and exposes standard HTTP endpoints. Its primary purpose is to be a deployable unit for later projects involving Docker, Kubernetes, CI/CD, Prometheus, and Grafana.

---

## 🛠 Tech Stack

- **Language:** Choose one:
  - **Go** (using `net/http` or a lightweight framework like Gin/Echo)
  - **Python** (using Flask or FastAPI)
- **Data Handling:** In-memory map/dictionary or JSON file
- **Testing:**
  - Go: standard testing library
  - Python: Pytest

---

## 🎯 Goals

1. Learn the fundamentals of building a RESTful API
2. Understand HTTP methods (GET, POST, PUT, DELETE) and status codes
3. Practice basic data handling (structs/classes, JSON serialization)
4. Write basic unit tests for API endpoints
5. Create a simple, reliable application component to deploy in later phases
6. Develop skills in structuring a simple backend service

---

## 🚀 Getting Started

### Go Example (using `net/http`)

```bash
# Clone the repository
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/apps/simple-api/

# Build the service
go build -o simple-api main.go

# Run the service (default: localhost:8080)
./simple-api
```

### Python Example (using Flask)

```bash
# Clone the repository and navigate to the app directory
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/apps/simple-api/

# Set up a virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies and run
pip install Flask
flask run  # default: localhost:5000
```

---

## ⚙️ Features

- ✅ Health check endpoint: `GET /healthz`
- ✅ CRUD for a resource (e.g., `/items`, `/items/{id}`)
- ✅ JSON request/response handling
- ✅ Basic error handling with appropriate HTTP status codes
- ✅ Unit tests for core logic and handlers

---

## 🧪 API Endpoints

| Method | Endpoint      | Description                                          |
| ------ | ------------- | ---------------------------------------------------- |
| GET    | `/healthz`    | Returns `200 OK` if the service is running           |
| GET    | `/items`      | List all items                                       |
| POST   | `/items`      | Create a new item (`201 Created`)                    |
| GET    | `/items/{id}` | Retrieve a specific item (`404` if not found)        |
| PUT    | `/items/{id}` | Update an item (`200 OK` or `204 No Content`)        |
| DELETE | `/items/{id}` | Delete an item (`204 No Content` or `404 Not Found`) |

---

## 📂 Project Structure

### Go

```text
.
├── main.go          # Entry point, HTTP server setup
├── handlers.go      # HTTP request handlers
├── store.go         # In-memory data storage logic
├── models.go        # Data structures (structs)
├── main_test.go     # Unit/integration tests
├── go.mod           # Module definition
├── go.sum
└── README.md        # You are here
```

### Python/Flask

```text
.
├── app.py           # Flask application instance and routes
├── models.py        # Data classes/structures
├── store.py         # In-memory data storage logic
├── tests/           # Unit tests (pytest)
│   └── test_app.py
├── requirements.txt # Python dependencies
└── README.md        # You are here
```

---

## 🧠 What I Learned

- RESTful API design principles
- Routing and request handling in Go and Python frameworks
- JSON serialization/deserialization
- Writing API unit tests
- Structuring a simple backend application

---

## 🔁 Next Steps

1. Containerize the API using Docker (Project 07b)
2. Add basic logging to endpoints
3. Integrate Prometheus metrics endpoint (`/metrics`)
4. Deploy to Kubernetes (Project 17)
5. (Optional) Connect to a persistent database instead of in-memory storage

---

## ✍️ Related Blog Ideas

- _Building My First REST API in Go/Python for DevOps Practice_
- _Why Every DevOps Engineer Should Build (and Deploy) a Simple App_
- _API Design Basics Learned While Building a Sample Service_
