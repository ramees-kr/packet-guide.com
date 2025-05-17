### ✅ Prompt: Build Minimalist Developer Portfolio + Blog with Effortless Publishing Workflow

---

I want you to help me **build and structure a personal technical blog + project portfolio site** called `packet-guide.com`. The site will use **Next.js 14 (App Router)** with **Tailwind CSS**, **MDX** support, and is designed for a **minimal, paper-like reading experience**. It will serve as a portfolio of projects, blogs, and documentation that showcase real-world hands-on infrastructure and cloud engineering.

### 👨‍💻 Overall Project Goal

A clean, fast, and distraction-free reading experience, drawing inspiration from sites like [ksharma.dev](https://ksharma.dev), [leerob.io](https://leerob.io), or [rauchg.com]. The site should be text-heavy with subtle UI and no fluff. **A critical outcome is a system where adding new blog posts is as simple as dropping a Markdown/MDX file into a designated content folder, with the site automatically handling the rest.**

---

### 📁 Project Setup

I have already created a Next.js 14 project with:

```bash
npx create-next-app@latest . \
  --typescript \
  --eslint \
  --tailwind \
  --src-dir \
  --app \
  --import-alias "@/*"
```

Please help me structure and implement everything inside a `site/` folder in my repo. I want all code and config for the website contained there.

---

### 🧱 Key Functional Areas

1.  **Tailwind CSS**

    - Use Tailwind with `@tailwindcss/typography`.
    - Typography-first: emphasize prose styles, a readable layout, and minimal UI.
    - Custom font (optional, but please suggest one, e.g., Inter).

2.  **MDX Blog**

    - Support Markdown/MDX in `/src/content/posts`.
    - Use `gray-matter` to parse frontmatter (title, date, excerpt, tags, author).
    - Display a blog index page at `/blog` with a list of all posts, sorted by date.
    - Individual blog post detail pages at `/blog/[slug]`.
    - **Publishing Workflow:** Implement a "drop-in" system for new posts. Adding a new `.md` or `.mdx` file to the content directory should be sufficient for it to be automatically picked up, listed, and rendered after deployment.

3.  **Projects Section**

    - Load project documentation from `site/src/content/projects/[PROJECT_SLUG].md` (or `.mdx`).
    - Display a list of projects at `/projects`.
    - Project detail pages at `/projects/[slug]`.

4.  **Static Pages (Content from Markdown)**

    - `/` → Home page with a brief introduction.
    - `/about` → Content from `site/src/content/pages/whoami.md`.
    - `/roadmap` → Content from `site/src/content/pages/roadmap.md`.
    - `/skills` → Content from `site/src/content/pages/skills_summary.md`.

5.  **Consistent Layout & Navigation**

    - Global layout with a header and footer.
    - Navigation links: Home, Blog, Projects, Roadmap, Skills, About.
    - Mechanism to highlight the current active page in the navigation.
    - Sticky header with a minimal style.
    - Fully responsive and mobile-friendly design.

6.  **Dark Mode**

    - Implement a simple light/dark mode toggle (using `next-themes` is preferred).
    - Ensure the toggle and themes preserve the minimalist aesthetic.

7.  **SEO & Metadata**

    - Dynamically generate proper `<title>` and `<meta name="description">` tags for each page.
    - Support Open Graph tags (e.g., `og:title`, `og:description`, `og:image`) for blog posts to enhance sharing.

8.  **Performance**

    - Optimize image loading using `next/image`.
    - Pre-render static paths for blog posts and projects using `generateStaticParams`.

9.  **Styling Theme**

    - Minimalist, clean, and print-like ("paper-like") aesthetic.
    - Subtle background (e.g., white, off-white, or soft gray).
    - Utilize the `@tailwindcss/typography` plugin's `prose` class for styling MD/MDX content.
    - Key style elements: rounded corners where appropriate, readable line height, and a `max-w-readable` constraint for text-heavy sections.

---

### 📦 Tech Stack

- `Next.js 14` (App Router)
- `TypeScript`
- `Tailwind CSS`
- `@tailwindcss/typography`
- `gray-matter` (for frontmatter parsing)
- `remark` and `remark-html` (or a suitable MDX bundler like `@next/mdx` or `next-mdx-remote`)
- `next-themes` (for dark mode)
- (Optional) `clsx` or `classnames` for conditional class names.

---

### ✅ Deliverables I Need Help With

1.  **Folder Structure:** Guidance on the optimal folder structure for content, layout components, UI components, library functions, and styles within the `site/` directory.
2.  **Blog System Logic:**
    - Functions to fetch and parse all blog posts for the index page.
    - Functions to fetch and parse individual blog posts for detail pages.
3.  **Project System Logic:** Similar logic for fetching and displaying project information.
4.  **Static Page Rendering:** Logic to render Markdown content for static pages like About, Roadmap, and Skills.
5.  **Layout & Navigation System:** Implementation of the global header, footer, and navigation, including active state highlighting.
6.  **MDX Parsing & Rendering:** Robust setup for processing `.md` and `.mdx` files, including frontmatter and content transformation.
7.  **Component Design:** Simple, reusable React components for:
    - `BlogCard` (for the blog index)
    - `ProjectCard` (for the projects index)
8.  **Styling:** Responsive, typography-first styles aligning with the minimalist, paper-like theme.
9.  **Deployment:** Instructions and best practices for deploying to Vercel (preferred) or GitHub Pages (if feasible for a fully static export).
10. **SEO & Feeds (Optional but Desirable):**
    - Generation of `sitemap.xml`.
    - Generation of an RSS feed (`feed.xml`) for the blog.

---

### 🧪 Development Tips

- Prioritize a **code-driven design**; avoid reliance on complex design tools like Figma.
- Focus on an excellent **developer experience** and a clean, maintainable architecture.
- **Content clarity** is paramount; avoid unnecessary animations or visual gimmicks.
- The site should feel like reading a well-formatted technical document or whitepaper with subtle, polished UI elements.

---

### 📍 Directory Structure Example (Target)

```txt
site/
├── public/
│   └── (favicons, static images)
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog index page
│   │   │   └── [slug]/page.tsx     # Blog post detail page
│   │   ├── projects/
│   │   │   ├── page.tsx            # Projects index page
│   │   │   └── [slug]/page.tsx     # Project detail page
│   │   ├── about/page.tsx
│   │   ├── roadmap/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── sitemap.xml/route.ts    # (If using Next.js route handler for sitemap)
│   │   ├── feed.xml/route.ts       # (If using Next.js route handler for RSS)
│   │   └── robots.ts               # (If using Next.js route handler for robots.txt)
│   ├── content/
│   │   ├── posts/                  # Blog posts as .md or .mdx files
│   │   ├── projects/               # Project descriptions as .md or .mdx files
│   │   └── pages/                  # Markdown for static pages (whoami.md, roadmap.md, etc.)
│   ├── components/
│   │   ├── layout/                 # Header.tsx, Footer.tsx, NavLink.tsx
│   │   ├── ui/                     # BlogCard.tsx, ProjectCard.tsx, ThemeProvider.tsx, ThemeToggle.tsx
│   │   └── icons/                  # (Optional: SVG icon components)
│   ├── lib/                        # Utility functions (e.g., content.ts or mdx.ts for parsing)
│   ├── styles/
│   │   └── globals.css
│   └── mdx-components.tsx          # Custom components to be used in MDX files
├── tailwind.config.ts
├── postcss.config.js
├── next.config.mjs
└── tsconfig.json
```

---

### ✅ Final Goal

I want this site to:

- Reflect the quality and attention to detail of a hands-on cloud/platform engineer.
- Be exceptionally fast, minimal in design, and consistent in its user experience.
- Feel like a trustworthy technical handbook or journal.
- **Be very easy to maintain, especially for publishing new blog content: the ideal workflow is to simply drop `.md` or `.mdx` files into the content directory.**

---
