# Packet Guide Astro Site

Static blog and project site built with Astro, Markdown content collections, and plain CSS.

## Commands

```bash
npm run dev
npm run build
npm run preview
```

Local development runs on Astro's default port unless a port is supplied:

```bash
npm run dev -- --host 127.0.0.1 --port 4321
```

## Content

- Blog posts live in `src/content/posts`.
- Projects live in `src/content/projects`.
- Static pages live in `src/content/pages`.
- Shared media can stay in `public/images`.

For easier post-specific media, place images next to a post and reference them with a relative Markdown path:

```md
![DNS resolver diagram](./resolver-diagram.png)
```

## Vercel

Set the Vercel project root directory to `site`.

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
