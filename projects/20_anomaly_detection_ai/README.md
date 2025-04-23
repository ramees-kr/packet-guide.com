# 📘 Project 20 – Anomaly Detection via Prometheus + AI

A Python-based system that monitors Prometheus metrics (including those from the Simple API Service) and applies anomaly detection logic to surface unusual behavior — such as unexpected spikes in API requests/latency, service degradation, or behavior drift in infrastructure components.

You’ll implement classic detection algorithms and optionally use AI-enhanced prompts (GPT) for generating summaries or response suggestions based on detected anomalies in both infrastructure and application metrics.

---

## 🧭 Overview

DevOps engineers often drown in dashboards. What if you had a system that automatically called out “weird” behavior in your infrastructure and your applications?

This project reads time series from Prometheus (via HTTP API), focusing on metrics from earlier Packet Guide projects like the DHCP server, DNS validation, and crucially, the Simple API Service (Project 07a/b, monitored by Project 12 exporter). It runs anomaly detection algorithms and flags results for:

- Visualization
- Alerting (potentially feeding into Project 16)
- GPT-based summarization or root cause suggestion (using concepts from Project 18)

---

## 🛠 Tech Stack

- Python 3.10+
- Prometheus HTTP API client (`requests`)
- Data analysis: `pandas`, `scipy`, `statsmodels`
- Visualization: `matplotlib`, `plotly`
- Optional AI integration: `openai` Python SDK or local LLM interface
- Configuration: `python-dotenv` or YAML

---

## 🎯 Goals

- Read metrics (API request rates, latency percentiles, error counts, DHCP rates, DNS failures) from Prometheus programmatically
- Detect outliers, sudden rate changes, or drift specifically in the Simple API Service metrics
- Apply similar detection logic to key infrastructure metrics
- Visualize detected anomalies overlaid on time series graphs
- Generate Markdown reports summarizing detected issues (infra or API related)
- (Optional) Use GPT to create mitigation suggestions based on the type of anomaly detected

---

## 🚀 Getting Started

1. Clone the project:

   ```bash
   git clone https://github.com/your-username/packet-guide.com.git
   cd packet-guide.com/projects/20_anomaly_detection_ai
   ```

2. Install dependencies:

   ```bash
   pip install requests pandas scipy matplotlib python-dotenv openai
   ```

3. Create `.env` file:

   ```
   PROMETHEUS_URL=http://localhost:9090  # Ensure this Prometheus scrapes Project 12 exporter
   OPENAI_API_KEY=your_key_here          # Optional for GPT features
   ```

4. Run the detection pipeline targeting an API metric:

   ```bash
   python detect.py --query 'simple_api_request_latency_seconds{quantile="0.95"}'
   python detect.py --query 'rate(simple_api_http_requests_total[5m])'
   ```

---

## 📂 Project Structure

```text
detect.py                    # Core anomaly detection pipeline
prometheus/
└── client.py               # Prometheus API abstraction
models/
└── zscore.py               # Example detection logic (e.g., MAD, rolling slope)
gpt/
└── summarizer.py           # Optional GPT report generator
plots/
└── api_latency_anomaly.png # Example visualized spike detection
.env                         # Environment variables
README.md
```

---

## 🔁 Detection Techniques

Implemented methods could include:

- Z-score anomaly detection
- Median Absolute Deviation (MAD)
- Rolling average + standard deviation bands
- Moving window slope changes
- (Optional) Statistical forecasting (ARIMA) residuals
- (Optional) FFT or seasonal decomposition

---

## 📄 Sample Report (Markdown for API Anomaly)

```markdown
# API Request Latency Spike Detected

Metric: simple_api_request_latency_seconds{quantile="0.95"}  
Time Range: 2025-05-22 14:30–14:45  
Baseline: ~0.05s (50ms)  
Spike: 0.85s (850ms) at 14:38 UTC

## Suspected Causes

- Backend database performance degradation
- Resource contention on Kubernetes node
- Recent deployment introduced inefficient query
- Network issue between API pod and dependency

## Suggested Actions

1. Check API pod logs (`kubectl logs ...`) for errors
2. Examine database performance metrics
3. Review recent code changes or deployments
4. Check Kubernetes node resource utilization (`kubectl top node ...`)
5. Consider rollback of recent deployment if correlated
```

---

## 🧠 What I Learned

- Querying Prometheus programmatically for application metrics
- Applying various time series anomaly detection algorithms
- Challenges in tuning detection for specific application behavior
- Visualizing anomalies effectively
- Differences between infrastructure anomaly detection and APM
- Optional: prompt engineering for actionable summaries

---

## 🧪 Example

```bash
# Detect anomalies in the rate of 5xx errors from the API
python detect.py --query 'rate(simple_api_http_requests_total{status_code=~"5.."}[5m])'
```

Result:

- Flags anomalies when error rate exceeds baseline
- Saves chart showing error rate with highlighted anomaly
- Generates summary suggesting checks for logs or backend issues

---

## ✍️ Related Blog Ideas

- _My First Infra Anomaly Detector: Smarter Monitoring with Python_
- _From Dashboards to Answers: Building GPT-Enhanced Observability_
- _Detecting Performance Anomalies in Your Custom API with Prometheus + Python_
- _Applying Anomaly Detection to Microservice Metrics_

---

## 🔁 Next Steps

- Add webhook alerting (e.g., Slack or PagerDuty) for critical API anomalies
- Package as a service (e.g., FastAPI) for continuous monitoring
- Train/tune models on longer historical baselines
- Integrate anomaly flags into Grafana dashboards (Project 13)
- Feed anomalies into GPT Runbook Generator (Project 18)
- Embed detection logic into Packet Guide exporter (Project 12) for real-time checks
