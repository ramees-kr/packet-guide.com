# 📘 Project 18 – Anomaly Detection via Prometheus + AI

A Python-based system that monitors Prometheus metrics and applies anomaly detection logic to surface unusual behavior — such as unexpected spikes, service degradation, or behavior drift.

You’ll implement both classic detection algorithms and optional AI-enhanced prompts for generating summaries or response suggestions.

---

## 🧭 Overview

DevOps engineers often drown in dashboards. What if you had a system that automatically called out “weird” behavior?

This project reads time series from Prometheus (via HTTP API), runs anomaly detection algorithms, and flags results for:

- Visualization
- Alerting
- GPT-based summarization or suggestion

---

## 🛠 Tech Stack

- Python 3.10+
- Prometheus HTTP API
- Pandas + SciPy or statsmodels
- matplotlib or plotly for visual output
- Optional:
  - OpenAI API or local LLM for GPT insights
  - FastAPI for exposing anomaly results

---

## 🎯 Goals

- Read metrics (like CPU, DNS failures, DHCP rate) from Prometheus
- Detect outliers, sudden rate changes, or drift
- Visualize anomalies on time series graphs
- Generate Markdown reports summarizing issues
- (Optional) Use GPT to create mitigation suggestions

---

## 🚀 Getting Started

1. Clone the project:

```bash
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/projects/18_anomaly_detection_ai
```

````

2. Install dependencies:

```bash
pip install requests pandas scipy matplotlib python-dotenv openai
```

3. Create .env file (optional for GPT):

```
PROMETHEUS_URL=http://localhost:9090
OPENAI_API_KEY=your_key_here
```

4. Run the detection pipeline:

```bash
python detect.py --query 'rate(dhcp_lease_count[5m])'
```

---

## 📂 Project Structure

```
detect.py                    # Core anomaly detection pipeline
prometheus/
└── client.py                # Prometheus API abstraction
models/
└── zscore.py                # Anomaly detection logic
gpt/
└── summarizer.py            # Optional GPT report generator
plots/
└── dhcp_anomaly.png         # Visualized spike detection
.env
README.md
```

---

## 🔁 Detection Techniques

Implemented methods:

- Z-score anomaly detection
- Rolling average + standard deviation bands
- Moving window slope changes
- (Optional) FFT or seasonal decomposition

---

## 📄 Sample Report (Markdown)

```
# DHCP Lease Rate Spike Detected

- Metric: rate(dhcp_lease_count[5m])
- Time Range: 2025-05-22 13:00–14:00
- Baseline: ~8 leases/min
- Spike: 37 leases/min at 13:42 UTC

## Suspected Causes
- New device wave / script run
- Possible MAC flooding or loop

## Suggested Actions
1. Check MAC address distribution
2. Verify DHCP server logs
3. Apply lease limits if needed
```

---

## 🧠 What I Learned

- Querying Prometheus programmatically
- Rolling averages, z-score windows, and spike logic
- Real-world anomaly detection strategies for observability
- Optional: Prompt engineering for generating summaries from data

---

## 🧪 Example

```bash
python detect.py --query 'dns_validator_mismatch_total'
```

Result:

- Flags anomaly at 12:01 UTC
- Saves chart with annotations
- Generates optional summary file

---

## ✍️ Related Blog Ideas

- “My First Infra Anomaly Detector: Smarter Monitoring with Python”
- “From Dashboards to Answers: Building GPT-Enhanced Observability”
- “Detecting DNS Drift Automatically with Prometheus + AI”

---

## 🔁 Next Steps

- Add webhook alerting or Slack output
- Package as a FastAPI service for internal observability
- Train anomaly logic on longer baseline data
- Integrate into Packet Guide exporter (Project 11)
````
