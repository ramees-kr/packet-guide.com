// site/src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjectSlugs, getProjectData } from "@/lib/content";
import { mdxCustomComponents } from "@/mdx-components";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

// Optional: Icons for links, similar to ProjectCard (or use a shared icon component later)
const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4 ml-1 inline-block"
  >
    <path
      fillRule="evenodd"
      d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h4a.75.75 0 010 1.5h-4z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.19a.75.75 0 00-.053 1.06z"
      clipRule="evenodd"
    />
  </svg>
);
const RepoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4 mr-1 inline-block"
  >
    <path
      fillRule="evenodd"
      d="M2 5a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H5a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v2.707L8.707 9 5 12.293V15a1 1 0 001 1h10a1 1 0 001-1v-2.707L11.293 9 15 5.707V5a1 1 0 00-1-1H5z"
      clipRule="evenodd"
    />
  </svg>
);

type Props = {
  params: Promise<{
    // params is a Promise in Next.js 15+ App Router
    slug: string;
  }>;
};

export async function generateMetadata(
  { params: paramsPromise }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await paramsPromise;
  const project = await getProjectData(params.slug);

  await _parent; // "Use" _parent

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The project you are looking for does not exist.",
    };
  }

  return {
    title: `${project.title} | Projects - Packet Guide`,
    description: project.description,
    // Add other metadata later if needed
  };
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs(); // Using the new function for projects
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ProjectDetailPage({
  params: paramsPromise,
}: Props) {
  const params = await paramsPromise;
  const project = await getProjectData(params.slug);

  if (!project) {
    notFound(); // Renders the not-found.tsx or default 404 page
  }

  const components = mdxCustomComponents;
  const mdxOptions = {
    // Define MDX options for plugins
    remarkPlugins: [],
    rehypePlugins: [],
  };

  return (
    <article className="py-12">
      <div className="container mx-auto px-4">
        {/* Project Header */}
        <header className="mb-8 pb-4 border-b border-surface-background text-center">
          {" "}
          {/* Added text-center */}
          <h1 className="text-4xl md:text-5xl font-bold text-text-default mb-3">
            {project.title}
          </h1>
          <p className="text-lg text-text-subtle mb-4">{project.description}</p>
          <div className="text-sm text-text-subtle mb-4">
            Last Updated:{" "}
            {new Date(project.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          {project.tags && project.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {" "}
              {/* Added justify-center */}
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-200 dark:bg-gray-700 text-text-subtle dark:text-gray-300 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            {" "}
            {/* Added justify-center */}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-link-default hover:text-link-hover hover:underline"
              >
                <RepoIcon /> Source Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-link-default hover:text-link-hover hover:underline"
              >
                <ExternalLinkIcon /> Live Demo
              </a>
            )}
          </div>
        </header>

        {/* Project Content - MDX */}
        <div className="prose dark:prose-invert max-w-readable mx-auto">
          <MDXRemote
            source={project.source} // Raw MDX string
            options={{ mdxOptions }}
            components={components}
          />
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects" className="text-link-default hover:underline">
            &larr; Back to all projects
          </Link>
        </div>
      </div>
    </article>
  );
}
