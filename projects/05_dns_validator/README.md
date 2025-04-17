# 📘 Project 05 – DNS Validator

A Python tool that verifies whether a list of DNS A records resolve to the correct IPs — validating actual DNS propagation and correctness against expected configurations.

This tool is your entry into infrastructure validation and will form the basis for later observability, auditing, and monitoring tooling.

---

## 🧭 Overview

In production environments, DNS errors cause cascading outages. Typos, wrong IPs, or slow propagation can go undetected.

This tool helps solve that by:

- Accepting a list of hostnames with their expected IPs
- Resolving each hostname using system DNS or custom resolver
- Comparing actual IP with the expected one
- Reporting mismatches, TTLs, and anomalies

It also introduces basic monitoring patterns: checks, alerts, and diffs.

---

## 🛠 Tech Stack

- Python 3.x
- dnspython
- argparse or Click
- Optional: CSV or YAML input
- Colorized output (rich or tabulate)

---

## 🎯 Goals

- Learn how DNS resolution works (recursion, TTL, records)
- Validate configuration against reality
- Flag stale or missing records in a clear report
- Prepare for Prometheus-style probing/alerts in future

---

## 🚀 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/projects/05_dns_validator
```

2. Install dependencies:

```bash
pip install dnspython rich
```

3. Run the validator:

```bash
python dns_validator.py --input records.csv
```

---

## 📄 Input Format

records.csv:

```
hostname,expected_ip
dev.packet-guide.com,10.0.0.5
web01.packet-guide.com,192.168.1.22
```

---

## 🧪 Example Output

```bash
python dns_validator.py --input records.csv
```

Terminal:

```
✅ dev.packet-guide.com → 10.0.0.5 [OK]
❌ web01.packet-guide.com → 192.168.1.12 [Expected: 192.168.1.22]
```

---

## 📂 Project Structure

```
dns_validator.py           # Main validator logic
records.csv                # Sample input file
results/                   # Optional output reports
README.md                  # You're here
```

---

## 🧠 What I Learned

- DNS resolution flow: resolver → root → authoritative
- TTLs and stale cache problems
- Error patterns: NXDOMAIN, SERVFAIL, loopbacks
- How to build comparison logic and structured output

---

## 🔁 Next Steps

- Add support for CNAME, TXT, or MX record types
- Export results as JSON or CSV
- Add --resolver flag to use a specific DNS (e.g., 1.1.1.1)
- Add test cases and mock DNS outputs

---

## ✍️ Related Blog Ideas

- “Building a DNS Validator in Python: Find Errors Before They Hit Prod”
- “Trust, but Verify: Lessons in DNS Resolution”
- “DNS as Code, Validated: Why I Audit Every A Record”
