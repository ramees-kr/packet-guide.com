# 📘 Project 01 – DNS A Record Script

A foundational DevOps and networking tool that automates the creation, deletion, and validation of DNS A records using Python.

This project simulates DNS-as-Code and teaches how DNS records work under the hood — using scripting, providers, and error handling patterns found in real-world infra.

---

## 🧭 Overview

DNS is the backbone of modern networks. Manually managing A records (hostname → IP address) is tedious and error-prone.  
This project automates that process by creating a CLI script that:

- Creates or deletes A records in a DNS zone
- Validates inputs (IP format, hostname format)
- Optionally interacts with public DNS APIs (Cloudflare, Route53) or local Bind9
- Logs the outcome of each operation

It’s one of the first tools in the Packet Guide journey and will evolve over time.

---

## 🛠 Tech Stack

- Python 3.x
- dnspython or requests
- Optional: Cloudflare API, Route53 SDK (boto3)
- Logging module
- Click (optional) for CLI experience

---

## 🎯 Goals

- Understand how A records are structured and resolved
- Learn to interact with a DNS service via CLI or API
- Handle DNS errors and propagation edge cases
- Log actions for audit/debugging
- Build a tool that simulates a DevOps DNS workflow

---

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/projects/01_dns_a_record_script
```

2. Install dependencies:

```bash
pip install dnspython requests
```

3. Run the tool:

```bash
# Add a record
python dns_tool.py add --hostname test.packet-guide.com --ip 192.168.1.20

# Delete a record
python dns_tool.py delete --hostname test.packet-guide.com
```

---

## ⚙️ Features

- ✅ Add A record
- ✅ Delete A record
- 🔄 Validate if A record matches a known IP
- 🛑 Detect and warn if record already exists or is missing
- 📜 Log every action to `dns_tool.log`

---

## 🧪 Examples

Add a record:

```bash
python dns_tool.py add --hostname dev.packet-guide.com --ip 10.0.0.5
```

Delete a record:

```bash
python dns_tool.py delete --hostname dev.packet-guide.com
```

Check if the record resolves:

```bash
dig dev.packet-guide.com
```

---

## 📂 Structure

```
dns_tool.py             # Main script
dns_provider.py         # Provider abstraction layer (optional)
config.yaml             # API keys, zones, TTLs
examples/               # Sample config, logs
README.md               # You're here
```

---

## 🧠 What I Learned

To be updated as you build:

- How DNS zones are structured
- TTL and record propagation
- Validating IPs and hostnames in code
- Using public DNS APIs securely
- Building reusable CLI tools

---

## ✍️ Related Blog Ideas

- “Understanding DNS A Records by Building a Python Tool”
- “DNS-as-Code: Automating Record Management with Python”
- “Debugging DNS Failures: Lessons from Writing My Own CLI”

---

## 🔁 Next Steps

- Add support for CNAME records
- Add dry-run / test mode
- Integrate with GitOps (sync A records from YAML)

```

```
