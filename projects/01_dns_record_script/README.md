# 📘 Project 01 – DNS A Record Automation Script

## 🧭 Overview

This script allows you to create, update, and delete A records on a local DNS server (e.g., Bind9) or through a public DNS API (e.g., Cloudflare, AWS Route53).  
It helps automate DNS operations that are often done manually and sets the foundation for DNS-as-Code.

## 🛠 Tech Stack

- Python (or Bash)
- dnspython / requests
- Optional: Cloudflare CLI, Route53 API, or Bind9 RNDC

## 🎯 Learning Goals

- Understand how DNS A records are structured and resolved
- Automate record management using code
- Handle common DNS errors (record exists, invalid format, etc.)

## 🚀 Getting Started

1. Clone this repo:

```bash
git clone https://github.com/your-username/packet-guide.git
cd packet-guide/projects/01_dns_record_script
```

2. Configure DNS provider (optional)
3. Run the script:

```bash
python manage_dns.py --add --hostname test.packet-guide.com --ip 192.168.1.20
```

## ✅ To Do

- [ ] Add update functionality
- [ ] Support for multiple providers (Cloudflare, Route53, etc.)
- [ ] Logging
- [ ] Tests

## 🧠 What I Learned

- How to use the dnspython library
- How DNS TTL and propagation works
- Handling DNS CLI/API error responses

---

Let me know if you'd like me to add the next project (e.g., 02_dhcp_lease_monitor) or blog templates right here as well.
