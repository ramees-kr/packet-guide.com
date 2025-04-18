# 📘 Project 02 – DHCP Lease Log Parser

A lightweight Python script that parses DHCP server logs to extract meaningful insights from lease events. This project helps develop log analysis skills, string parsing, and builds the foundation for real-time alerting and dashboarding systems in later phases.

---

## 🧭 Overview

In a real-world network, the DHCP server assigns IPs dynamically to devices. These assignments are logged — and those logs are gold. This project builds a tool that:

- Parses standard DHCP log files (e.g., Kea DHCP or dnsmasq)
- Extracts IP, MAC address, and hostname for every lease event
- Outputs the result to console or a structured log file
- Helps visualize and later alert on network events

---

## 🛠 Tech Stack

- Python 3.x
- Regular Expressions (re module) or JSON parsing (for Kea)
- `argparse` or `Click` for CLI
- Optional: `pandas` or `csv` for output
- Sample logs from Kea DHCP or dnsmasq

---

## 🎯 Goals

- Learn DHCP lease formats and log patterns (especially for Kea)
- Practice reading & parsing real logs
- Track IP usage and host activity over time
- Prepare for building alerting/monitoring on top of log events

---

## 🚀 Getting Started

1.  Clone the project:
    ```bash
    git clone https://github.com/your-username/packet-guide.com.git
    cd packet-guide.com/projects/02_dhcp_log_parser
    ```
2.  Install dependencies:
    ```bash
    pip install rich
    ```
3.  Run the script (adjust log path/format for Kea):

    ```bash
    # Example for Kea JSON logs (path may vary)
    python dhcp_log_parser.py --file examples/kea-dhcp4.log --format json

    # Example for dnsmasq logs
    python dhcp_log_parser.py --file examples/dnsmasq.log --format text
    ```

---

## ⚙️ Features

- ✅ Parse log file for IP/MAC/Hostname
- ✅ Filter by MAC address or hostname
- ✅ Output to structured JSON or CSV (optional)
- 🔄 Track most recent lease per device
- 🔔 Prepare for real-time tailing (in future CLI tool)

---

## 🧪 Example Output

Kea DHCP often logs in JSON format. A parsed lease might look like this (structure depends on Kea logging configuration):

```json
{
  "ip": "192.168.0.101",
  "mac": "aa:bb:cc:dd:ee:ff",
  "hostname": "laptop-01",
  "timestamp": "2025-04-10T12:01:45Z",
  "lease_type": "DHCP4_LEASE_ADVERT"
}
```

---

## 📂 Project Structure

```
dhcp_log_parser.py      # Main script
examples/
├── kea-dhcp4.log       # Sample Kea DHCP logs (JSON or text)
├── dnsmasq.log         # Sample dnsmasq logs
├── output.json         # Optional structured results
README.md               # You're here
```

---

## 🧠 What I Learned

To be updated while building:

- DHCP lease mechanics
- How log messages are formatted (text vs. JSON) and rotated
- Regex and string parsing for semi-structured logs, or JSON parsing for Kea
- Importance of parsing vs. tailing vs. streaming

---

## 🔁 Next Steps

- Add MAC filtering (`--mac aa:bb:cc`)
- Support live log tailing
- Export metrics to Prometheus later

---

## ✍️ Related Blog Ideas

- “Parsing DHCP Logs: The Gateway to Network Observability”
- “How I Built a Python Tool to Track Lease Events”
- “From Logs to Alerts: A Beginner’s Journey with DHCP”

---
