# 📘 Project 18 – GPT Runbook Generator

A Python-based tool that uses GPT (via OpenAI API or local LLM) to generate incident response runbooks based on structured input (like logs, errors, metrics, or alert summaries).

This bridges AI and infrastructure operations — helping document and respond to events faster.

---

## 🧭 Overview

Every outage should leave behind a runbook. But writing one after the fact is tedious.

This tool:

- Accepts logs or error descriptions as input
- Sends a formatted prompt to a GPT-based API
- Returns a Markdown or JSON “runbook” response
- Optionally saves the runbook to Git for future reference

You can use it interactively (CLI) or in batch mode (CI/CD trigger or postmortem pipeline).

---

## 🛠 Tech Stack

- Python 3.10+
- OpenAI Python SDK or open-source LLM integration
- dotenv or YAML config
- Markdown output
- Optional: SQLite for history or Git auto-commit

---

## 🎯 Goals

- Learn to write effective prompts for system-related queries
- Build a tool that reduces toil and speeds up documentation
- Capture known resolutions as Markdown
- Generate templated runbooks based on system state

---

## 🚀 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/packet-guide.com.git
cd packet-guide.com/projects/16_gpt_runbook_generator
```

2. Configure OpenAI credentials:

```bash
echo "OPENAI_API_KEY=your_key_here" > .env
```

3. Install dependencies:

```bash
pip install openai rich python-dotenv
```

4. Run the CLI:

```bash
python runbook.py --input examples/dns-failure.log --output runbooks/dns-incident-2025.md
```

---

## 📂 Project Structure

```
runbook.py                   # Main script
prompt_templates/
└── dns_failure.md.j2        # Jinja prompt template
examples/
└── dns-failure.log          # Simulated input file
runbooks/
└── dns-incident-2025.md     # AI-generated output
.env                         # OpenAI key
README.md
```

---

## 🧠 What I Learned

To reflect while building:

- Prompt engineering for system automation
- How to get structured output from GPT (Markdown/JSON)
- Using AI to bootstrap documentation
- Limits of AI for production support

---

## 📄 Sample Prompt Template

```jinja
You're a senior SRE.

Given the following log extract and context, generate a step-by-step runbook for investigation and resolution.

## Logs:
{{ log_contents }}

## Known context:
- DNS system is Cloudflare-managed
- Service impacted: api.packet-guide.com

## Format:
- Title
- Summary
- Root Cause
- Investigation Steps
- Mitigation
- Resolution
```

---

## 🧪 Output Preview (Markdown)

```
# DNS Incident: api.packet-guide.com Not Resolving

## Summary
This runbook outlines steps to investigate and resolve DNS resolution issues.

## Root Cause
Incorrect A record due to propagation failure.

## Investigation Steps
1. Check dig/nslookup output
2. Verify DNS record on Cloudflare panel
3. Check TTL and propagation delay

...

```

---

## 🔁 Next Steps

- Add template selection for different incident types
- Generate JSON + YAML versions for integration
- Auto-publish runbooks to internal wiki (Confluence, Notion)
- Use as part of CI/CD failure handler

---

## ✍️ Related Blog Ideas

- “Using GPT to Generate Postmortems Automatically”
- “My AI-Powered Runbook Assistant for DNS Failures”
- “What Happens When You Give GPT Your Logs”

---

## ⚠️ Ethical Use Reminder

- Human review is always required
- This is an assistive tool, not a full SRE replacement
- Validate accuracy before sharing or acting on advice
