# Project Plan: packet-guide.com - Minimalist Developer Portfolio & Blog

**Site:** packet-guide.com
**Goal:** A clean, fast, and distraction-free reading experience for a technical blog and project portfolio, built with Next.js 14 (App Router), Tailwind CSS, and MDX. The primary aim is to make ongoing blog publishing simple and efficient.

---

## Simplified Ongoing Publishing Workflow for packet-guide.com

Once the initial site setup (detailed in Phases 0-6 below) is complete, particularly the core blogging engine (Phase 1) and deployment pipeline (Phase 6), publishing new blog content becomes a simple, streamlined process:

**1. Content Creation: The "Drop & Go" Method**
_ **Write Post:** Create blog posts as Markdown (`.md`) or MDX (`.mdx`) files.
_ **Location:** Store posts in `site/src/content/posts/`.
_ **Frontmatter:** For each post, include the following at the top of the file:
_ `title`: Your blog post title.
_ `date`: Publication date (e.g., `YYYY-MM-DD`).
_ `excerpt`: A short summary or teaser for the blog index page.
_ `author`: (Optional) Your name or author identifier.
_ `tags`: (Optional) Comma-separated keywords or categories (e.g., `Next.js, Tailwind, Cloud`).

        **Example `.mdx` file:**
        ```markdown
        ---
        title: "My Awesome New Post"
        date: "2025-05-17"
        excerpt: "A brief look into the amazing world of simplified blogging."
        author: "Your Name"
        tags: "Blogging, Simplicity, Next.js"
        ---

        Your main blog content starts here...
        ```

**2. Core Blogging Engine (Automated Backend)**
_ The functions `getSortedPostsData()` and `getPostData(slug)` located in `site/src/lib/content.ts` (or `site/src/lib/mdx.ts`) will automatically detect and process new posts.
_ The Blog Index page (`/blog`) and individual post pages (`/blog/[slug]`) will update dynamically to include new content.

**3. The "Publish" Step**
_ **Write:** Create your new `.md` or `.mdx` blog post file in the `site/src/content/posts/` directory.
_ **Commit & Push:** Add the new file to your Git repository, commit your changes, and push them to your main branch (e.g., on GitHub). \* **Automatic Deployment:** If using a service like Vercel (recommended), it will automatically detect the new commit, rebuild your site, and deploy the changes. Your new blog post will then be live.

This workflow ensures that your primary focus remains on content creation, minimizing technical overhead for routine publishing after the initial site development.

---

## Detailed Development Phases

The following phases outline the development work required to build the `packet-guide.com` site and enable the simplified publishing workflow described above.

## Phase 0: Foundation & Setup

**Goal:** Initialize the project, set up Tailwind CSS, create the basic layout structure, and ensure the development environment is operational.

- [ x] **0.1: Project Initialization & Structure**
  - [x] Confirm Next.js 14 project created with TypeScript, ESLint, Tailwind, `src/` directory, App Router, and `@/*` import alias.
  - [x] Ensure all project code is within a `site/` folder in the repository.
  - [x] Review and confirm the target directory structure (as outlined in `prompt.md`).
- [x] **0.2: Tailwind CSS Configuration**
  - [x] Install `@tailwindcss/typography`.
  - [x] Configure `site/tailwind.config.ts`:
    - [x] Add `src/content/**/*.{md,mdx}` to `content` array.
    - [x] Set up `theme.extend.typography` with custom prose styles (colors, maxWidth, lineHeight).
    - [x] (Optional) Define a custom font family (e.g., Inter) via CSS variable.
    - [x] Define `subtle` background colors for light/dark modes.
    - [x] Define `default` text colors for light/dark modes.
    - [x] Enable `darkMode: 'class'`.
    - [x] Add `@tailwindcss/typography` to plugins.
  - [x] Configure `site/postcss.config.js` (usually default is fine).
- [x] **0.3: Global Styles & Font**
  - [x] Update `site/src/styles/globals.css`:
    - [x] Import Tailwind base, components, utilities.
    - [x] Define base body styles (background, text color, antialiasing, font).
    - [x] (Optional) Add subtle paper-like background texture.
    - [x] Define consistent focus styles (`*:focus-visible`).
    - [x] Define `.max-w-readable` utility class.
  - [x] If using a custom web font (e.g., Inter), import it in `site/src/app/layout.tsx` (e.g., from `next/font/google`).
- [x] **0.4: Basic Layout Components**
  - [x] Create `site/src/components/layout/Header.tsx` (placeholder content).
  - [x] Create `site/src/components/layout/Footer.tsx` (placeholder content, e.g., copyright).
  - [x] Create `site/src/components/layout/NavLink.tsx` (for navigation links, handling active state later).
- [x] **0.5: Root Layout (`layout.tsx`)**
  - [x] Set up `site/src/app/layout.tsx`:
    - [x] Import global CSS.
    - [x] Import and apply custom font if chosen.
    - [x] Set `lang="en"` and `suppressHydrationWarning` on `<html>`.
    - [x] Apply base `<body>` classes (font, background, text colors).
    - [x] Implement basic structure: `div` (flex, min-h-screen) > `Header`, `main` (flex-grow, container, padding), `Footer`.
    - [x] Add basic `metadata` (site title, description).
- [x] **0.6: Home Page (`page.tsx`)**
  - [x] Create a simple `site/src/app/page.tsx` with a placeholder heading (e.g., "Welcome to Packet Guide").
- [x] **0.7: Verify Setup**
  - [x] Run `npm run dev` (or `yarn dev` / `pnpm dev`).
  - [x] Check if the home page loads with basic layout and styling.
  - [x] Verify Tailwind utility classes and typography plugin are working.

---

## Phase 1: Core Content - Blog

**Goal:** Implement MDX/Markdown processing for blog posts, create blog listing page, and individual blog post pages. This phase is critical for enabling the simplified publishing workflow.

- [ ] **1.1: MDX/Content Processing Setup**
  - [ ] Install necessary packages: `gray-matter`, `remark`, `remark-html`, `reading-time`. (Consider `next-mdx-remote` or a similar bundler for more advanced MDX features if needed).
  - [ ] Configure `site/next.config.mjs` for MDX support (using `@next/mdx` plugin or equivalent).
    - [ ] Add `pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']`.
    - [ ] Configure `remarkPlugins` and `rehypePlugins` if needed (e.g., `rehypeSlug`, `rehypeAutolinkHeadings` - can be added later).
  - [ ] Create `site/src/mdx-components.tsx` to allow custom components in MDX (can be basic for now).
- [ ] **1.2: Content Fetching Logic (`lib/content.ts` or `lib/mdx.ts`)**
  - [ ] Create the content utility file (e.g., `site/src/lib/content.ts`).
  - [ ] Implement `getPostData(slug: string)` function:
    - [ ] Reads individual `.md`/`.mdx` file from `site/src/content/posts/`.
    - [ ] Uses `gray-matter` to parse frontmatter (title, date, excerpt, author, tags etc.).
    - [ ] Processes Markdown/MDX content (e.g., using `remark` and `remark-html`, or preparing for MDX component rendering).
    - [ ] Calculates `readingTime`.
    - [ ] Returns `slug`, frontmatter, content (HTML or MDX source), and readingTime.
  - [ ] Implement `getSortedPostsData()` function:
    - [ ] Reads all `.md`/`.mdx` files from `site/src/content/posts/`.
    - [ ] Parses frontmatter for each.
    - [ ] Sorts posts by date (newest first).
    - [ ] Returns an array of post metadata (slug, title, date, excerpt, etc.).
- [ ] **1.3: Sample Blog Content**
  - [ ] Create 2-3 sample blog posts in `site/src/content/posts/` (e.g., `my-first-post.mdx`, `another-update.md`).
  - [ ] Include frontmatter (title, date, excerpt, author, tags).
  - [ ] Add some Markdown content.
- [ ] **1.4: Blog Index Page (`/blog`)**
  - [ ] Create `site/src/app/blog/page.tsx`.
  - [ ] Use `getSortedPostsData()` to fetch all posts.
  - [ ] Create `site/src/components/ui/BlogCard.tsx`:
    - [ ] Props: `post` (title, date, excerpt, slug, tags, readingTime).
    - [ ] Displays post information cleanly.
    - [ ] Links to `/blog/[slug]`.
    - [ ] Minimalist, paper-like card styling.
  - [ ] List `BlogCard` components on the blog index page.
  - [ ] Add a title like "Blog" or "Articles".
- [ ] **1.5: Blog Post Page (`/blog/[slug]`)**
  - [ ] Create `site/src/app/blog/[slug]/page.tsx`.
  - [ ] Implement `generateStaticParams()` to pre-render blog posts using slugs from `getSortedPostsData()`.
  - [ ] Implement `generateMetadata({ params })` to dynamically set page title and description from post frontmatter.
  - [ ] Fetch individual post data using `getPostData(params.slug)`.
  - [ ] Display post title, date, author, reading time.
  - [ ] Render post content (e.g., using MDX components or `dangerouslySetInnerHTML` if using HTML from `remark-html`).
  - [ ] Apply `prose dark:prose-invert max-w-readable mx-auto` classes to the content container for typography styling.
- [ ] **1.6: Verify Blog Functionality**
  - [ ] Check blog index page: lists posts, links work.
  - [ ] Check individual blog post pages: content renders correctly, metadata is set.
  - [ ] Ensure prose styles are applied.
  - [ ] Test adding a new blog post file and ensure it appears after a rebuild (simulating the simplified workflow).

---

## Phase 2: Core Content - Projects

**Goal:** Load project documentation (READMEs or dedicated .md files) and display them on project listing and detail pages.

- [ ] **2.1: Project Content Strategy**
  - [ ] Decision: Project content will be in `site/src/content/projects/[PROJECT_SLUG].md` (or `.mdx`).
  - [ ] Define frontmatter for projects (title, description, tags, repoUrl, demoUrl, date/lastUpdated).
- [ ] **2.2: Project Fetching Logic (`lib/content.ts`)**
  - [ ] Add `getProjectData(slug: string)` function to `site/src/lib/content.ts`:
    - [ ] Reads individual project `.md`/`.mdx` file from `site/src/content/projects/`.
    - [ ] Parses frontmatter.
    - [ ] Converts Markdown to HTML or prepares MDX.
    - [ ] Returns `slug`, frontmatter, content.
  - [ ] Add `getSortedProjectsData()` function:
    - [ ] Reads all project files.
    - [ ] Parses frontmatter.
    - [ ] Sorts projects (e.g., by date or title).
    - [ ] Returns an array of project metadata.
- [ ] **2.3: Sample Project Content**
  - [ ] Create 2-3 sample project files in `site/src/content/projects/` (e.g., `my-cool-app.md`, `another-tool.mdx`).
  - [ ] Include relevant frontmatter.
  - [ ] Add some Markdown content describing the projects.
- [ ] **2.4: Projects Index Page (`/projects`)**
  - [ ] Create `site/src/app/projects/page.tsx`.
  - [ ] Use `getSortedProjectsData()` to fetch all projects.
  - [ ] Create `site/src/components/ui/ProjectCard.tsx`:
    - [ ] Props: `project` (title, description, slug, tags, repoUrl, demoUrl).
    - [ ] Displays project information.
    - [ ] Links to `/projects/[slug]`.
    - [ ] Links to repository and demo if available.
    - [ ] Minimalist card styling.
  - [ ] List `ProjectCard` components on the projects index page.
  - [ ] Add a title like "Projects".
- [ ] **2.5: Project Detail Page (`/projects/[slug]`)**
  - [ ] Create `site/src/app/projects/[slug]/page.tsx`.
  - [ ] Implement `generateStaticParams()` for projects.
  - [ ] Implement `generateMetadata({ params })` for project titles.
  - [ ] Fetch project data using `getProjectData(params.slug)`.
  - [ ] Display project title, description, links.
  - [ ] Render project content (apply `prose` styles).
- [ ] **2.6: Verify Projects Functionality**
  - [ ] Check projects index page: lists projects, links work.
  - [ ] Check individual project pages: content renders, metadata is set.

---

## Phase 3: Static Pages & Navigation

**Goal:** Create static content pages (About, Roadmap, Skills) and implement a consistent global navigation system.

- [ ] **3.1: Static Page Content (`site/src/content/pages/`)**
  - [ ] Create `whoami.md` (for About page).
  - [ ] Create `roadmap.md` (for Roadmap page).
  - [ ] Create `skills_summary.md` (for Skills page).
  - [ ] Add relevant Markdown content to each file.
- [ ] **3.2: Content Fetching for Static Pages (`lib/content.ts`)**
  - [ ] Add `getPageContent(pageName: string)` function to `site/src/lib/content.ts`:
    - [ ] Reads `.md` file from `site/src/content/pages/`.
    - [ ] Converts Markdown to HTML/MDX content.
    - [ ] Returns content.
- [ ] **3.3: Static Page Components**
  - [ ] Create `site/src/app/about/page.tsx`:
    - [ ] Fetch content from `whoami.md` using `getPageContent('whoami')`.
    - [ ] Set page title "About".
    - [ ] Render content with `prose` styles.
  - [ ] Create `site/src/app/roadmap/page.tsx`:
    - [ ] Fetch content from `roadmap.md`.
    - [ ] Set page title "Roadmap".
    - [ ] Render content with `prose` styles.
  - [ ] Create `site/src/app/skills/page.tsx`:
    - [ ] Fetch content from `skills_summary.md`.
    - [ ] Set page title "Skills".
    - [ ] Render content with `prose` styles.
- [ ] **3.4: Navigation Implementation**
  - [ ] Update `site/src/components/layout/Header.tsx`:
    - [ ] Include site title/logo (text-based for minimalism, e.g., "Packet Guide"). Link to `/`.
    - [ ] Use `NavLink.tsx` for navigation links: Home (`/`), Blog (`/blog`), Projects (`/projects`), Roadmap (`/roadmap`), Skills (`/skills`), About (`/about`).
    - [ ] Implement logic in `NavLink.tsx` to highlight the current page (use `usePathname` from `next/navigation`).
    - [ ] Style header: sticky, minimal, subtle background/border.
    - [ ] Ensure responsiveness (e.g., hamburger menu for mobile or wrap links).
- [ ] **3.5: Footer Refinement**
  - [ ] Update `site/src/components/layout/Footer.tsx`:
    - [ ] Add copyright with current year dynamically (e.g., `© ${new Date().getFullYear()} Packet Guide`).
    - [ ] (Optional) Add social links or other relevant footer info.
    - [ ] Minimal styling.
- [ ] **3.6: Verify Static Pages & Navigation**
  - [ ] All static pages load their content correctly.
  - [ ] Navigation links work.
  - [ ] Current page is highlighted in the navigation.
  - [ ] Header is sticky and responsive.

---

## Phase 4: Styling & UX Enhancements

**Goal:** Refine typography, implement dark mode, and ensure overall responsive design and mobile-friendliness.

- [ ] **4.1: Typography and Prose Refinement**
  - [ ] Review all `prose` styled content (blog posts, project details, static pages).
  - [ ] Fine-tune `tailwind.config.ts` typography settings for readability (font sizes, line heights, spacing, link styles).
  - [ ] Ensure code blocks within prose are styled well (consider `rehype-pretty-code` or similar for syntax highlighting if not already handled by `@tailwindcss/typography`'s defaults).
- [ ] **4.2: Dark Mode Implementation**
  - [ ] Install `next-themes`: `npm install next-themes`.
  - [ ] Create `site/src/components/ui/ThemeProvider.tsx`.
  - [ ] Wrap `RootLayout` children with `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>`.
  - [ ] Create `site/src/components/ui/ThemeToggle.tsx` button to switch between light, dark, and system themes.
  - [ ] Add `ThemeToggle` button to the `Header.tsx` or another accessible location.
  - [ ] Verify `dark:` variants in Tailwind are working correctly across all components and prose.
  - [ ] Ensure `bg-subtle-dark` and `text-default-dark` (or your custom dark theme colors) are applied correctly.
  - [ ] Check prose dark mode styles (`dark:prose-invert`).
- [ ] **4.3: Responsive Design Polish**
  - [ ] Test the entire site on various screen sizes (desktop, tablet, mobile).
  - [ ] Ensure layouts adapt correctly (no horizontal scrolling).
  - [ ] Check navigation responsiveness (hamburger menu or link wrapping).
  - [ ] Verify readability of text and touch target sizes on mobile.
  - [ ] Ensure images are responsive (using `next/image`).
- [ ] **4.4: Consistent UI Elements**
  - [ ] Review buttons, cards, links for consistent styling (rounded corners, padding, hover/focus states).
  - [ ] Ensure a cohesive visual language.

---

## Phase 5: SEO & Final Touches

**Goal:** Implement SEO best practices, generate sitemap and RSS feed, and optimize images.

- [ ] **5.1: Per-Page Metadata**
  - [ ] Ensure all pages (`layout.tsx`, `page.tsx` in app routes) have dynamic or static `metadata` objects:
    - [ ] `title` (specific to the page).
    - [ ] `description` (specific to the page).
    - [ ] (Optional) `keywords`.
  - [ ] Implement Open Graph tags for blog posts (`/blog/[slug]/page.tsx` `generateMetadata`):
    - [ ] `og:title`, `og:description`, `og:type`, `og:url`.
    - [ ] `og:image` (consider a default image or generating images dynamically for posts).
    - [ ] (Optional) `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.
- [ ] **5.2: `robots.txt`**

  - [ ] Create `site/src/app/robots.ts` (for Next.js App Router `robots.txt` generation).

    ```typescript
    // site/src/app/robots.ts
    import { MetadataRoute } from "next";

    export default function robots(): MetadataRoute.Robots {
      const siteUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        "[https://packet-guide.com](https://packet-guide.com)"; // Replace with your actual domain
      return {
        rules: {
          userAgent: "*",
          allow: "/",
          // disallow: '/private/', // if you have private pages
        },
        sitemap: `${siteUrl}/sitemap.xml`,
      };
    }
    ```

- [ ] **5.3: `sitemap.xml` Generation**

  - [ ] Create `site/src/app/sitemap.ts` (for Next.js App Router sitemap generation).

    - [ ] Include static pages, blog posts, and project pages.
    - [ ] Set `lastModified`, `changeFrequency`, `priority`.

    ```typescript
    // site/src/app/sitemap.ts (Example structure)
    import { MetadataRoute } from "next";
    // Import your content fetching functions (getSortedPostsData, getSortedProjectsData)
    // import { getSortedPostsData } from '@/lib/content'; // Adjust path as needed

    export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
      const siteUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        "[https://packet-guide.com](https://packet-guide.com)"; // Replace

      // Example: Add blog posts
      // const posts = getSortedPostsData(); // Assuming this returns objects with slug and date
      // const blogPostEntries: MetadataRoute.Sitemap = posts.map(post => ({
      //   url: `${siteUrl}/blog/${post.slug}`,
      //   lastModified: post.date, // Or a more specific lastModified date
      //   changeFrequency: 'weekly',
      //   priority: 0.8,
      // }));

      return [
        {
          url: siteUrl,
          lastModified: new Date().toISOString(),
          changeFrequency: "yearly",
          priority: 1,
        },
        {
          url: `${siteUrl}/blog`,
          lastModified: new Date().toISOString(), // Or based on latest post
          changeFrequency: "weekly",
          priority: 0.9,
        },
        // ... add blogPostEntries
        // ... add project pages, static pages (about, roadmap, skills)
      ];
    }
    ```

  - [ ] Verify `/sitemap.xml` is generated correctly after build.

- [ ] **5.4: RSS Feed Generation**

  - [ ] Install `rss` package: `npm install rss && npm install -D @types/rss`.
  - [ ] Create `site/src/app/feed.xml/route.ts`.

    - [ ] Include blog posts with title, description, URL, date.

    ```typescript
    // site/src/app/feed.xml/route.ts (Example structure)
    import RSS from "rss";
    // Import your content fetching functions
    // import { getSortedPostsData } from '@/lib/content'; // Adjust path

    export async function GET() {
      const siteUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        "[https://packet-guide.com](https://packet-guide.com)"; // Replace
      // const posts = getSortedPostsData(); // Fetch your posts

      const feed = new RSS({
        title: "Packet Guide Blog",
        description: "Technical articles and insights from Packet Guide.",
        site_url: siteUrl,
        feed_url: `${siteUrl}/feed.xml`,
        language: "en",
        pubDate: new Date(), // Or date of latest post
        copyright: `© ${new Date().getFullYear()} Packet Guide`,
      });

      // posts.forEach(post => {
      //   feed.item({
      //     title: post.title,
      //     description: post.excerpt, // Or full content
      //     url: `${siteUrl}/blog/${post.slug}`,
      //     guid: `${siteUrl}/blog/${post.slug}`,
      //     date: post.date,
      //     author: post.author, // If available
      //   });
      // });

      return new Response(feed.xml({ indent: true }), {
        headers: {
          "Content-Type": "application/atom+xml; charset=utf-8",
        },
      });
    }
    ```

  - [ ] Add RSS feed link to `site/src/app/layout.tsx` metadata:
    ```typescript
    // site/src/app/layout.tsx metadata
    // ...
    export const metadata = {
      // ... other metadata
      alternates: {
        types: {
          "application/rss+xml": `${
            process.env.NEXT_PUBLIC_BASE_URL || "https://packet-guide.com"
          }/feed.xml`,
        },
      },
    };
    ```
  - [ ] Verify `/feed.xml` is generated and valid.

- [ ] **5.5: Image Optimization**
  - [ ] Ensure all images are served using `next/image` for optimization (lazy loading, responsive sizes, modern formats).
  - [ ] Provide `alt` text for all images for accessibility.
- [ ] **5.6: Favicon**
  - [ ] Add favicon files (e.g., `favicon.ico`, `apple-touch-icon.png`, `icon.svg`) to `site/public/` or `site/src/app/`.
  - [ ] Ensure Next.js picks them up or configure in `layout.tsx` metadata.
  ```typescript
  // site/src/app/layout.tsx metadata example
  export const metadata = {
    // ...
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
  ```

---

## Phase 6: Deployment

**Goal:** Prepare the site for deployment and deploy to a hosting provider.

- [ ] **6.1: Final Build & Test**
  - [ ] Define `NEXT_PUBLIC_BASE_URL` environment variable (e.g., `https://packet-guide.com`).
  - [ ] Run `npm run build` (or `yarn build` / `pnpm build`).
  - [ ] Run `npm run start` (or `yarn start` / `pnpm start`) to test the production build locally.
  - [ ] Perform a final check of all functionality.
- [ ] **6.2: Vercel Deployment (Recommended)**
  - [ ] Sign up/log in to Vercel.
  - [ ] Connect your GitHub/GitLab/Bitbucket repository.
  - [ ] Configure project settings:
    - [ ] Framework Preset: Next.js (should be auto-detected).
    - [ ] Root Directory: `site` (if your Next.js project is in the `site/` subdirectory of your repo).
    - [ ] Build command, Output directory, Install command should be auto-detected.
    - [ ] Set up environment variables (e.g., `NEXT_PUBLIC_BASE_URL`).
  - [ ] Deploy.
  - [ ] Assign custom domain (`packet-guide.com`).
- [ ] **6.3: GitHub Pages Deployment (Alternative, less ideal for full Next.js features)**
  - [ ] Note: GitHub Pages is best for fully static sites. For Next.js sites with App Router, dynamic rendering, Vercel or similar platforms are much better suited. If proceeding, ensure all dynamic aspects are compatible with static export.
  - [ ] If aiming for a purely static export:
    - [ ] Configure `output: 'export'` in `site/next.config.mjs`.
    - [ ] Run `npm run build` (this will generate an `out/` folder).
    - [ ] Set up GitHub Actions to build and deploy the `out/` folder to the `gh-pages` branch.
    - [ ] Configure repository settings to serve from `gh-pages` branch.
    - [ ] Be aware of limitations (no API routes, server components become client components unless pre-rendered, image optimization might need custom loader for static export).
- [ ] **6.4: Post-Deployment Checks**
  - [ ] Verify the live site is working as expected on your custom domain.
  - [ ] Check SSL certificate.
  - [ ] Submit sitemap to Google Search Console and other search engines.
  - [ ] Test site speed (e.g., PageSpeed Insights).
  - [ ] Validate RSS feed.

---
