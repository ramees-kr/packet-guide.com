# 📘 Project 06 – DHCP Email Alerts

A Python script that watches DHCP lease logs and sends an email alert when specific devices (based on MAC address or hostname) receive a lease. This is your first alerting workflow — bridging log monitoring and messaging. It’s simple, useful, and foundational for later Prometheus + PagerDuty flows.

---

## 🧭 Overview

In a corporate or home lab environment, you may want to know when a specific device joins the network (e.g., new IoT device, rogue laptop, etc.). This tool does just that:

- Parses DHCP lease logs (e.g., Kea DHCP or dnsmasq)
- Matches MAC addresses or hostnames against a watchlist
- Sends an email alert using SMTP when a match is found
- Optionally logs alerts or flags unexpected devices

---

## 🛠 Tech Stack

- Python 3.x
- `smtplib` (built-in) or third-party like `yagmail`
- Log parser (shared from Project 02 - **needs updating for Kea format**)
- `config.yaml` or JSON for MAC/host rules

---

## 🎯 Goals

- Learn how alerting flows work from log → trigger → notify
- Implement email via SMTP (or Gmail SMTP API)
- Build on top of log parsing logic (handling Kea's format)
- Prepare for real-time streaming with Kafka later

---

## 🚀 Getting Started

1.  Clone the repo:
    ```bash
    git clone https://github.com/your-username/packet-guide.com.git
    cd packet-guide.com/projects/06_dhcp_email_alerts
    ```
2.  Install dependencies:
    ```bash
    pip install rich pyyaml # Add any other needed libraries
    ```
3.  Prepare `config.yaml`:
    ```yaml
    watchlist:
      - mac: "aa:bb:cc:dd:ee:ff"
        name: "CriticalDevice"
      - hostname: "laptop-rogue"
    email:
      smtp_server: smtp.gmail.com
      port: 587
      sender: you@example.com
      password: yourpassword # Consider using environment variables or secrets management
      recipient: alerts@example.com
    ```
4.  Run the alert monitor (adjust log path/format for Kea):

    ```bash
    # Example for Kea JSON logs (path may vary)
    python dhcp_email_alert.py --log examples/kea-dhcp4.log --format json

    # Example for dnsmasq logs
    python dhcp_email_alert.py --log examples/dnsmasq.log --format text
    ```

---

## ⚙️ Features

- ✅ Watch for specific MAC or hostname
- ✅ Send HTML/text email with alert details
- 🔄 Optionally log alerts locally
- 🔐 Configurable via YAML

---

## 🧪 Sample Alert Email

Subject: 🚨 DHCP Alert – New Lease for laptop-rogue

Body:

```
Hostname: laptop-rogue
MAC: 00:11:22:33:44:55
IP: 192.168.1.120
Timestamp: 2025-07-12 12:03:02
```

_(Note: Ensure your updated parser extracts these details correctly from Kea logs)_

---

## 📂 Project Structure

```
dhcp_email_alert.py       # Main alert logic
config.yaml               # MAC/watchlist and email setup
examples/
├── kea-dhcp4.log         # Sample Kea DHCP logs (JSON or text)
└── dnsmasq.log         # Sample dnsmasq logs
README.md                 # You're here
```

---

## 🧠 What I Learned

To be updated while building:

- How email is sent from Python
- The role of SMTP, TLS, credentials
- Watchlist matching logic
- Incident-style alerting patterns
- Adapting parsing logic for different log formats (Kea JSON vs. text)

---

## 🔁 Next Steps

- Integrate with a dashboard/log viewer
- Trigger webhook (instead of just email)
- Connect to Kafka for real-time event push

---

## ✍️ Related Blog Ideas

- “From Logs to Alerts: My First Network Watcher”
- “How I Built an Email Alert Tool for DHCP Events”
- “When My Laptop Joined the Network… I Got an Email”

---
