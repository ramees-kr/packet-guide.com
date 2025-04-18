## 📝 Packet Guide: Project Documentation Template

This template should guide the creation of a detailed documentation file for each project (e.g., a `PROJECT_DOCS.md` or an expanded README).

**Goal:** Capture essential context for AI assistance during development and provide structured, reusable content blocks for future blogs, tutorials, and videos.

---

### **`## 0. Project Meta`**

_(Provides context for you, AI, and any future program structure)_

- **Project Number & Title:** (e.g., `02 - DHCP Lease Log Parser`)
- **Phase:** (e.g., `1: Scripting & Automation`)
- **Primary Technology:** (e.g., Python, Go, Terraform)
- **Key Concepts:** (List core ideas, e.g., `Log Parsing`, `JSON`, `DHCP Leases`, `CLI Arguments`, `SMTP`)
- **Dependencies/Prerequisites:** (Link to previous Packet Guide projects if applicable, required tools/accounts like Python 3.x, Go 1.21+, Cloudflare account, etc.)
- **Estimated Time:** (Your best guess, e.g., `~2 weeks`)

---

### **`## 1. Overview & Goals (The "Why")`**

_(Adapted from existing README - good for introductions)_

- **Problem Statement:** Briefly describe the pain point or need this project addresses (e.g., "Manual DHCP log analysis is time-consuming and error-prone").
- **High-Level Goal:** What is the primary outcome of this project? (e.g., "Create a Python tool to automatically parse Kea DHCP logs for key lease information").
- **Specific Learning Objectives:** What specific skills or concepts will be practiced/learned? (Use bullets from existing `🎯 Goals` section).

---

### **`## 2. Technical Deep Dive (The "How")`**

_(Crucial for detailed understanding, AI assistance, and technical explanations)_

- **Core Logic / Architecture:**
  - Describe the main steps the code takes (e.g., "1. Open log file. 2. Read line by line. 3. If JSON, parse structure. 4. Extract IP, MAC, hostname, timestamp. 5. Store/Print extracted data.").
  - Mention key algorithms or patterns used (e.g., "Uses `json` library for parsing", "Implements basic watchlist matching").
- **Key Code Snippets / Functions:** _(Essential for AI help & tutorials)_
  - Paste 1-3 critical functions or code blocks with brief explanations (e.g., the main parsing function, the alerting trigger logic, the Terraform resource definition). Use code fences (```).
- **Configuration Details:**
  - List required configuration files (e.g., `config.yaml`, `.env`) and explain critical parameters within them.
  - Mention necessary environment variables or secrets (e.g., `CLOUDFLARE_API_TOKEN`, `PAGERDUTY_ROUTING_KEY`).
- **Tech Stack Rationale:** _(Briefly explain choices)_
  - Why this language? (e.g., "Python chosen for its rich libraries for web requests and data handling").
  - Why these libraries/tools? (e.g., "`dnspython` used for robust DNS lookups", "`Cobra` chosen for standard Go CLI structure"). (Based on `🛠 Tech Stack`)
- **Potential Challenges / Gotchas:** _(Important for learning & AI context)_
  - What difficulties were anticipated or encountered during development? (e.g., "Handling different Kea log formats/verbosity levels", "API rate limits", "Terraform state management conflicts", "Go concurrency issues").
  - Any non-obvious dependencies or system requirements?

---

### **`## 3. Setup & Usage (Practical Steps)`**

_(Adapted from `🚀 Getting Started` & `🧪 Examples` - good for tutorials/demos)_

- **Environment Setup:**
  - Detailed prerequisites (e.g., "Requires Python 3.10+", "Needs Docker for Kafka setup").
  - Installation steps (`pip install ...`, `go build ...`, `terraform init`).
- **Configuration Steps:**
  - How to create/populate necessary config files or set environment variables.
- **Execution Walkthrough:**
  - Step-by-step commands to run the tool/deploy the infrastructure.
  - Explain flags and arguments clearly.
- **Expected Output / Verification:**
  - Show sample terminal output, generated files, or screenshots of the result (e.g., successful DNS record creation message, sample JSON output, Grafana panel).
  - How to verify it worked (e.g., `dig` command, checking Kafka topic, viewing PagerDuty incident).

---

### **`## 4. Learnings & Reflection (The Outcome)`**

_(Adapted from `🧠 What I Learned` - good for blogs/retrospectives)_

- **Key Takeaways:** Summarize the most important technical or conceptual lessons learned in bullet points.
- **Challenges Faced & Solutions:** Detail how specific problems identified in the "Deep Dive" were actually solved.
- **Alternative Approaches Considered:** Briefly mention if other methods were explored and why the final approach was chosen (e.g., "Considered using regex for Kea JSON logs but direct parsing was more robust").
- **"Aha!" Moments:** Any specific insights gained during the project?

---

### **`## 5. Future Enhancements & Integration (The "What's Next")`**

_(Adapted from `🔁 Next Steps`)_

- **Planned Improvements:** Specific features or refinements planned for _this_ project.
- **Integration Points:** How does this project feed into or connect with _later_ projects in the Packet Guide? (e.g., "Output from this parser will be sent to Kafka in Project 10", "Metrics from this exporter will be used in Project 12's dashboard").

---

### **`## 6. Content Reuse Hooks (Assets for Future Use)`**

_(Explicit mapping for blogs, videos, etc.)_

- **Target Audience for Reuse:** (e.g., Beginners learning Python, DevOps engineers setting up monitoring)
- **Potential Blog Post Titles:** (Use existing `✍️ Related Blog Ideas`)
- **Key Sections for Blog/Tutorial:** (`Overview & Goals`, `Technical Deep Dive` [simplified], `Setup & Usage`, `Learnings`)
- **Key Sections for Video Script:** (Intro=`Overview`, Demo=`Setup & Usage`, Explanation=`Technical Deep Dive` highlights, Recap=`Learnings`)
- **Core Info for AI Prompts:** (`Project Meta`, `Overview & Goals`, `Technical Deep Dive` [esp. Code Snippets & Challenges], `Setup & Usage` [for command generation])

---
