# 📘 Project 02 – DHCP Lease Log Parser

A lightweight Python script that parses DHCP server logs to extract meaningful insights from lease events.

This project helps develop log analysis skills, string parsing, and builds the foundation for real-time alerting and dashboarding systems in later phases.

---

## 🧭 Overview

In a real-world network, the DHCP server assigns IPs dynamically to devices. These assignments are logged — and those logs are gold.

This project builds a tool that:

- Parses standard DHCP log files (e.g., ISC DHCP or dnsmasq)
- Extracts IP, MAC address, and hostname for every lease event
- Outputs the result to console or a structured log file
- Helps visualize and later alert on network events

---

## 🛠 Tech Stack

- Python 3.x
- Regular Expressions (re module)
- argparse or Click for CLI
- Optional: pandas or csv for output
- Sample logs from dnsmasq or ISC DHCP

---

## 🎯 Goals

- Learn DHCP lease formats and log patterns
- Practice reading & parsing real logs
- Track IP usage and host activity over time
- Prepare for building alerting/monitoring on top of log events

---

## 🚀 Getting Started

1. Clone the project:

```bash
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/projects/02_dhcp_log_parser
```

2. Install dependencies:

```bash
pip install rich
```

3. Run the script:

```bash
python dhcp_log_parser.py --file examples/dhcpd.log
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

From ISC-DHCP log line:

```
Apr 10 12:01:45 dhcpd: DHCPACK on 192.168.0.101 to aa:bb:cc:dd:ee:ff (laptop-01)
```

Parsed:

```json
{
  "ip": "192.168.0.101",
  "mac": "aa:bb:cc:dd:ee:ff",
  "hostname": "laptop-01",
  "timestamp": "2025-04-10 12:01:45"
}
```

---

## 📂 Project Structure

```
dhcp_log_parser.py      # Main script
examples/
├── dhcpd.log           # Sample DHCP logs
├── output.json         # Optional structured results
README.md               # You're here
```

---

## 🧠 What I Learned

To be updated while building:

- DHCP lease mechanics
- How log messages are formatted and rotated
- Regex and string parsing for semi-structured logs
- Importance of parsing vs. tailing vs. streaming

---

## 🔁 Next Steps

- Add MAC filtering (--mac aa:bb:cc)
- Support live log tailing
- Export metrics to Prometheus later

---

## ✍️ Related Blog Ideas

- “Parsing DHCP Logs: The Gateway to Network Observability”
- “How I Built a Python Tool to Track Lease Events”
- “From Logs to Alerts: A Beginner’s Journey with DHCP”
