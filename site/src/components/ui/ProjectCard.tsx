// site/src/components/ui/ProjectCard.tsx
import Link from "next/link";
import type { ProjectData } from "@/lib/content"; // Import ProjectData type

interface ProjectCardProps {
  project: ProjectData;
}

// Optional: Simple icons for repo and demo links (you can replace with SVG icons later)
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
  // Placeholder, consider a GitHub icon or similar
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

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="mb-8 p-6 rounded-lg bg-surface-background shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out flex flex-col">
      <header className="mb-3">
        <h2 className="text-2xl font-bold text-text-default mb-1">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-link-default transition-colors"
          >
            {project.title}
          </Link>
        </h2>
        <p className="text-sm text-text-subtle">
          Last updated:{" "}
          {new Date(project.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <div className="text-text-default mb-4 flex-grow">
        <p>{project.description}</p>
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
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

      <footer className="mt-auto flex flex-wrap gap-4 text-sm">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-default hover:text-link-hover hover:underline transition-colors flex items-center"
          >
            <RepoIcon /> View Code
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-default hover:text-link-hover hover:underline transition-colors flex items-center"
          >
            <ExternalLinkIcon /> Live Demo
          </a>
        )}
      </footer>
    </article>
  );
};

export default ProjectCard;
