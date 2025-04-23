# 📘 Project 07a – Simple API Service

This project involves building a basic RESTful API service using either Go or Python. This serves as the sample application that will be containerized, deployed, monitored, and managed using the infrastructure tools built throughout the Packet Guide journey.

---

## 🧭 Overview

To effectively learn infrastructure automation and observability, it’s crucial to have a target application. This project creates a simple, stateless (or minimally stateful) API service that simulates a real-world microservice.

The API provides basic functionality (e.g., CRUD operations on an in-memory data store or simple computations) and exposes standard HTTP endpoints. Its primary purpose is to be a deployable unit for later projects involving Docker, Kubernetes, CI/CD, Prometheus, and Grafana.

---

## 🛠 Tech Stack

- **Language:** Choose one:
  - Go (`net/http`, Gin, or Echo)
  - Python (Flask or FastAPI)
- **Data Handling:** In-memory map/dictionary or JSON file
- **Testing:**
  - Go: `go test`
  - Python: `pytest`

---

## 🎯 Goals

1. Learn the fundamentals of building a RESTful API
2. Understand HTTP methods and status codes
3. Practice data handling and JSON serialization
4. Write unit tests for endpoints
5. Create a reliable application component for later deployment phases
6. Structure a simple backend service

---

## 🚀 Getting Started

### Go Example

```bash
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/apps/simple-api/

go build -o simple-api main.go
./simple-api  # runs on localhost:8080
```

### Python Example

```bash
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/apps/simple-api/

python -m venv venv
source venv/bin/activate
pip install Flask
flask run  # runs on localhost:5000
```

---

## ⚙️ Features

- ✅ `GET /healthz` health check
- ✅ CRUD endpoints for `/items` and `/items/{id}`
- ✅ JSON request/response handling
- ✅ Error handling with appropriate status codes
- ✅ Unit tests for core logic

---

## 🧪 API Endpoints

| Method | Endpoint      | Description                                 |
| ------ | ------------- | ------------------------------------------- |
| GET    | `/healthz`    | Returns 200 OK if the service is running    |
| GET    | `/items`      | List all items                              |
| POST   | `/items`      | Create a new item (201 Created)             |
| GET    | `/items/{id}` | Retrieve a specific item (404 if not found) |
| PUT    | `/items/{id}` | Update an item (200 OK or 204 No Content)   |
| DELETE | `/items/{id}` | Delete an item (204 No Content or 404)      |

---

## ✨ Example Request/Response

**POST /items**  
_Request:_

```json
{
  "name": "My New Item",
  "value": 123
}
```

_Response:_

```
201 Created
{
  "id": "xyz789",
  "name": "My New Item",
  "value": 123
}
```

**GET /items/xyz789**  
_Response:_

```
200 OK
{
  "id": "xyz789",
  "name": "My New Item",
  "value": 123
}
```

---

## 📂 Project Structure

### Go

```text
main.go
handlers.go
store.go
models.go
main_test.go
go.mod
go.sum
README.md
```

### Python/Flask

```text
app.py
models.py
store.py
tests/
  test_app.py
requirements.txt
README.md
```

---

## 🧠 What I Learned

- RESTful API design principles
- Routing and request handling in Go and Python
- JSON serialization/deserialization
- Writing unit tests for APIs
- Structuring a simple backend

---

## 🔁 Next Steps

1. Containerize with Docker
2. Add logging to endpoints
3. Integrate Prometheus metrics (`/metrics`)
4. Deploy to Kubernetes
5. (Optional) Connect to a persistent database

---

## ✍️ Related Blog Ideas

- _Building My First REST API in Go/Python_
- _Why Every DevOps Engineer Should Build a Simple App_
- _API Design Basics Learned While Building a Sample Service_
