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

// --- Helper function to get all files recursively ---
function getMarkdownFilePathsRecursively(directoryPath: string): string[] {
  let filePaths: string[] = [];
  try {
    const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullEntryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) {
        filePaths = filePaths.concat(
          getMarkdownFilePathsRecursively(fullEntryPath)
        );
      } else if (/\.mdx?$/.test(entry.name)) {
        // Filter for .md or .mdx files
        filePaths.push(fullEntryPath);
      }
    }
  } catch (error) {
    // Log error but don't throw, allowing partial reads if some subdirs are problematic
    console.error(
      `Error reading directory ${directoryPath} for recursive file search:`,
      error
    );
  }
  return filePaths;
}

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export function getSortedPostsData(): PostMeta[] {
  const allFilePaths = getMarkdownFilePathsRecursively(postsDirectory);

  const allPostsData = allFilePaths
    .map((fullPath): PostMeta | null => {
      const fileName = path.basename(fullPath); // Get just the filename
      const slug = fileName.replace(/\.mdx?$/, "");

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
          `Post "${fileName}" (at ${fullPath}) is missing required frontmatter. Skipping.`
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
  const allFilePaths = getMarkdownFilePathsRecursively(postsDirectory);

  const targetFilePath = allFilePaths.find((filePath) => {
    const fileName = path.basename(filePath);
    return fileName.replace(/\.mdx?$/, "") === slug;
  });

  if (!targetFilePath) {
    console.error(
      `Post with slug "${slug}" not found in ${postsDirectory} or its subdirectories.`
    );
    return null;
  }

  let fileContents;
  try {
    fileContents = fs.readFileSync(targetFilePath, "utf8");
  } catch (error) {
    console.error(`Error reading file: ${targetFilePath}`, error);
    return null;
  }

  const { data, content } = matter(fileContents);

  if (!data.title || !data.date || !data.excerpt) {
    console.warn(
      `Post "${slug}" (at ${targetFilePath}) is missing required frontmatter.`
    );
  }

  const frontmatter = data as PostFrontmatter;
  const stats = readingTime(content);

  // For MDXRemote from /rsc, we return the raw content string
  return {
    slug,
    readingTime: stats.text,
    source: content,
    ...frontmatter,
  };
}

export function getAllPostSlugs(): { slug: string }[] {
  const allFilePaths = getMarkdownFilePathsRecursively(postsDirectory);

  return allFilePaths.map((fullPath) => {
    const fileName = path.basename(fullPath);
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
