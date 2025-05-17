// site/src/lib/content.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter"; // For parsing frontmatter
import readingTime from "reading-time"; // For calculating reading time
// No longer need 'serialize' or 'MDXRemoteProps' from 'next-mdx-remote' here

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  tags?: string[];
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  source: string; // Source is now the raw MDX string content
}

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export function getSortedPostsData(): PostMeta[] {
  // ... (this function remains the same as before)
  let filenames: string[];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error(`Error reading posts directory: ${postsDirectory}`, error);
    return [];
  }

  const allPostsData = filenames
    .filter((filename) => /\.mdx?$/.test(filename))
    .map((fileName): PostMeta | null => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      let fileContents;
      try {
        fileContents = fs.readFileSync(fullPath, "utf8");
      } catch (error) {
        console.error(`Error reading file: ${fullPath}`, error);
        return null;
      }
      const matterResult = matter(fileContents);
      if (
        !matterResult.data.title ||
        !matterResult.data.date ||
        !matterResult.data.excerpt
      ) {
        console.warn(
          `Post "${fileName}" is missing required frontmatter (title, date, or excerpt). Skipping.`
        );
        return null;
      }
      const frontmatter = matterResult.data as PostFrontmatter;
      const stats = readingTime(matterResult.content);
      return {
        slug,
        readingTime: stats.text,
        ...frontmatter,
      };
    })
    .filter((post): post is PostMeta => post !== null);

  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<Post | null> {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  let fullPath: string;

  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    console.error(`Post with slug "${slug}" not found in ${postsDirectory}`);
    return null;
  }

  let fileContents;
  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    console.error(`Error reading file: ${fullPath}`, error);
    return null;
  }

  const { data, content } = matter(fileContents); // 'content' is the raw MDX string

  if (!data.title || !data.date || !data.excerpt) {
    console.warn(
      `Post "${slug}" is missing required frontmatter (title, date, or excerpt).`
    );
  }

  const frontmatter = data as PostFrontmatter;
  const stats = readingTime(content);

  // REMOVED: const mdxSource = await serialize(content, { ... });

  return {
    slug,
    readingTime: stats.text,
    source: content, // Return the raw MDX content string
    ...frontmatter,
  };
}

export function getAllPostSlugs(): { slug: string }[] {
  // ... (this function remains the same as the last corrected version)
  let filenames: string[];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error(
      `Error reading posts directory for slugs: ${postsDirectory}`,
      error
    );
    return [];
  }
  return filenames
    .filter((filename) => /\.mdx?$/.test(filename))
    .map((fileName) => {
      return {
        slug: fileName.replace(/\.mdx?$/, ""),
      };
    });
}

export interface ProjectFrontmatter {
  title: string;
  date: string; // Or lastUpdated, for sorting. Format: YYYY-MM-DD
  description: string;
  tags: string[]; // Array of tags
  repoUrl?: string;
  demoUrl?: string;
  // Add any other project-specific frontmatter fields
}

// For lists of projects (e.g., on the /projects index page)
export interface ProjectData extends ProjectFrontmatter {
  slug: string;
}

// For a single project page, including its MDX content
export interface Project extends ProjectData {
  source: string; // Raw MDX content string
}

// Path to the directory where your project files are stored
const projectsDirectory = path.join(process.cwd(), "src/content/projects");

export function getSortedProjectsData(): ProjectData[] {
  let filenames: string[];
  try {
    filenames = fs.readdirSync(projectsDirectory);
  } catch (error) {
    console.error(
      `Error reading projects directory: ${projectsDirectory}`,
      error
    );
    return [];
  }

  const allProjectsData = filenames
    .filter((filename) => /\.mdx?$/.test(filename)) // Filter for .md or .mdx
    .map((fileName): ProjectData | null => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      let fileContents;
      try {
        fileContents = fs.readFileSync(fullPath, "utf8");
      } catch (error) {
        console.error(`Error reading project file: ${fullPath}`, error);
        return null;
      }

      const { data } = matter(fileContents); // Only need frontmatter for the list

      // Basic validation for required fields
      if (!data.title || !data.date || !data.description || !data.tags) {
        console.warn(
          `Project "${fileName}" is missing required frontmatter (title, date, description, or tags). Skipping.`
        );
        return null;
      }

      const frontmatter = data as ProjectFrontmatter;

      return {
        slug,
        ...frontmatter,
      };
    })
    .filter((project): project is ProjectData => project !== null);

  // Sort projects by date (newest first)
  return allProjectsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getProjectData(slug: string): Promise<Project | null> {
  const mdxPath = path.join(projectsDirectory, `${slug}.mdx`);
  const mdPath = path.join(projectsDirectory, `${slug}.md`);
  let fullPath: string;

  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    console.error(
      `Project with slug "${slug}" not found in ${projectsDirectory}`
    );
    return null;
  }

  let fileContents;
  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    console.error(`Error reading project file: ${fullPath}`, error);
    return null;
  }

  const { data, content } = matter(fileContents); // 'content' is the raw MDX string

  // Basic validation
  if (!data.title || !data.date || !data.description || !data.tags) {
    console.warn(
      `Project "${slug}" is missing required frontmatter (title, date, description, or tags).`
    );
    // You might still want to return the project if some fields are missing,
    // or handle this more strictly depending on your needs.
  }

  const frontmatter = data as ProjectFrontmatter;

  return {
    slug,
    source: content, // Raw MDX string
    ...frontmatter,
  };
}

export function getAllProjectSlugs(): { slug: string }[] {
  let filenames: string[];
  try {
    filenames = fs.readdirSync(projectsDirectory);
  } catch (error) {
    console.error(
      `Error reading projects directory for slugs: ${projectsDirectory}`,
      error
    );
    return [];
  }

  return filenames
    .filter((filename) => /\.mdx?$/.test(filename))
    .map((fileName) => {
      return {
        slug: fileName.replace(/\.mdx?$/, ""),
      };
    });
}

// --- Static Page Content Types ---

export interface PageContent {
  source: string; // Raw MDX content string
  frontmatter: Record<string, unknown>; // Use Record<string, unknown> instead of any
}

// Path to the directory where your static page markdown files are stored
const staticPagesDirectory = path.join(process.cwd(), "src/content/pages");

// --- Static Page Content Functions ---

export async function getPageContent(
  pageName: string
): Promise<PageContent | null> {
  // Assume .md extension for static pages as per plan (whoami.md, roadmap.md, etc.)
  const fullPath = path.join(staticPagesDirectory, `${pageName}.md`);

  if (!fs.existsSync(fullPath)) {
    console.error(
      `Static page "${pageName}.md" not found in ${staticPagesDirectory}`
    );
    return null;
  }

  let fileContents;
  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    console.error(`Error reading static page file: ${fullPath}`, error);
    return null;
  }

  // Use gray-matter to parse the page content.
  // This will separate frontmatter (if any) from the main content.
  const { data, content } = matter(fileContents);

  return {
    source: content, // The main Markdown/MDX content
    frontmatter: data, // Any frontmatter found (will be an empty object if none)
  };
}
