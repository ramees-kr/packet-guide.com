# 📦 Packet Guidance – Task Protocol

> “Every task, big or small, follows a system. This ensures I learn deeply, document clearly, and build consistently.”

---

## 🧭 Phase-Based Protocol (Common for Every Task or Project)

### 🟢 1. Start → Plan the Task

- [ ] Create a new GitHub issue for the task using the issue template
- [ ] Add task to Notion tracker under current phase & project
- [ ] Assign it a tag: 🧪 experiment, 🧰 feature, 🧹 cleanup, 📚 learning
- [ ] Write a 1-liner goal: “What will this task accomplish?”

📍 Tip: For feature/tasks, break into 2–3 micro-steps.

---

### 🟡 2. Build → Execute the Task

- [ ] Work in local project folder: `projects/xx_project_name/`
- [ ] Use Python or Go as appropriate
- [ ] Commit code or scripts as atomic commits
- [ ] Use this format for commits: feat(task): DNS A record add/delete

📍 Save test cases, inputs, logs, or output samples in a `/examples` subfolder.

---

### 🔵 3. Document → After Completing the Task

- [ ] Update the project’s README.md > ✅ To Do checklist
- [ ] Write “What I Learned” notes in README.md or `docs/logs/YYYY-MM.md`
- [ ] Push code and README to GitHub
- [ ] If worth sharing, write a draft blog post in `blog/YYYY-MM-task-title.md`

📍 If project has diagrams or outputs → put them in `docs/diagrams/project-name/`

---

### 🟣 4. Reflect → Weekly or After Milestone

- [ ] Move GitHub issue to “Done” in project board
- [ ] Check progress in Notion or log sheet
- [ ] Write 1–2 sentences in `docs/logs/YYYY-MM.md`: What worked? What broke?

📍 Optional: Push this as a commit log or weekly update post.

---

### 🔁 5. Reuse → Bonus Step

- [ ] Was this task repeatable?
  - [ ] Consider turning it into a function/script/module
  - [ ] Save it in `lib/` for future projects

📍 Tag reusable utilities in README or with 📦 emoji in the project.

---

## 📘 Example Workflow: DHCP Parser Task

1. Create GitHub issue: “Parse DHCP lease logs for MAC + IP info”
2. Add to Notion: Tag 🧪 experiment under “DHCP Project”
3. Work inside: `projects/02_dhcp_lease_monitor/`
4. Add output samples in: `examples/lease_samples.log`
5. After testing:
   - Update README ✅ checklist
   - Write log: `docs/logs/2025-05.md`
   - Commit + push code
6. Write blog draft: `blog/2025-05-dhcp-log-parser.md`

---
