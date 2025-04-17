# 📘 Project 03 – System Docs Generator

Automatically generate Markdown documentation for a machine or virtual environment by extracting system information and embedding it in structured, readable templates.

This is your first “docs-as-code” tool in the Packet Guide stack — great for internal auditing, asset inventories, or even GitOps-style recordkeeping.

---

## 🧭 Overview

System documentation is often out of date or missing entirely. This project builds a simple, scriptable tool that creates Markdown files populated with:

- Hostname, IP, OS, uptime, DNS configuration
- Network interfaces, memory/CPU summary
- Optional: installed packages, disk layout

This encourages self-updating system records, ideal for audit trails or Git-managed infrastructure.

---

## 🛠 Tech Stack

- Python 3.x or Bash
- os, socket, psutil, platform, netifaces
- Markdown templating (Jinja2 or raw)
- YAML output (optional for GitOps-style use)

---

## 🎯 Goals

- Understand how to retrieve system-level metadata
- Create clean Markdown system summaries
- Use basic templating / formatting for docs
- Optionally support multiple OS types

---

## 🚀 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/projects/03_system_docs_generator
```

2. Install dependencies:

```bash
pip install psutil netifaces jinja2
```

3. Run the script:

```bash
python generate_sysdoc.py
```

4. Output:
   A Markdown file saved as `docs/generated/{hostname}.md`

---

## 🧪 Sample Output

📄 docs/generated/web-01.md

```markdown
# System Report: web-01

## 🧠 Basic Info

- Hostname: web-01
- OS: Ubuntu 22.04 LTS
- Uptime: 3 days, 6 hours

## 🌐 Network

- IP: 192.168.0.101
- DNS: 1.1.1.1, 8.8.8.8

## 🖥 Resources

- Memory: 8 GB
- CPU: 4 cores
- Disk: 80 GB SSD

Generated on 2025-05-04
```

---

## 📂 Project Structure

```
generate_sysdoc.py        # Main generator script
templates/
└── system_template.md    # Markdown Jinja2 layout
docs/generated/           # Auto-saved documentation
README.md                 # You're here
```

---

## 🧠 What I Learned

To be updated as you build:

- How to gather system info from the OS
- Markdown templating strategies
- Dynamic doc generation + YAML/Markdown structure
- Importance of documenting infra like code

---

## 🔁 Next Steps

- Add YAML output or JSON export
- Integrate with Git to version snapshots
- Add support for multiple hosts via SSH (Phase 4+)

---

## ✍️ Related Blog Ideas

- “Docs-as-Code: Building My First System Documentation Tool”
- “Generating Markdown from Python: Lessons from Packet Guide”
- “Documenting Infrastructure Like a Developer”
