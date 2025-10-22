// site/src/app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData, PostMeta } from "@/lib/content";
import { getSortedProjectsData, ProjectData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Packet Guide | Home",
  description:
    "Documenting a journey through the command line, SaaS, and building fun, interesting things.",
};

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function HomePage() {
  // Fetch the latest 3 posts and projects
  const latestPosts: PostMeta[] = getSortedPostsData().slice(0, 3);
  const latestProjects: ProjectData[] = getSortedProjectsData().slice(0, 3);

  return (
    <div className="py-8 md:py-12">
      {/* Introduction Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-text-default mb-6">
          Welcome to Packet Guide
        </h1>
        <div className="space-y-4 text-text-default dark:text-gray-300 max-w-readable">
          <p>
            Welcome to my digital workbench! This site is where I share the
            small, interesting, and hopefully fun things I build during my
            journey through the worlds of the <strong>command line</strong>,{" "}
            <strong>SaaS</strong>, and
            <strong> cloud infrastructure</strong>.
          </p>
          <p>
            I genuinely enjoy building stuff, figuring out how things work, and
            automating repetitive tasks. Lately, I've also gotten pretty good at
            making <strong>GPTs</strong> write prompts for me to get things
            done.
          </p>
          <p>
            Stick around as I document my projects and learnings here. See you
            around!
          </p>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-text-default mb-8 border-b border-surface-background dark:border-gray-700 pb-2">
          Recent Activity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {/* Latest Articles Column */}
          {latestPosts.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-text-default mb-4">
                Latest Articles
              </h3>
              <ul className="space-y-3">
                {latestPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-link-default hover:underline hover:text-link-hover block"
                    >
                      {post.title}
                    </Link>
                    <p className="text-sm text-text-subtle">
                      {formatDate(post.date)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href="/blog"
                  className="text-sm text-link-default hover:underline"
                >
                  View all articles &rarr;
                </Link>
              </div>
            </div>
          )}

          {/* Recent Projects Column */}
          {latestProjects.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-text-default mb-4">
                Recent Projects
              </h3>
              <ul className="space-y-3">
                {latestProjects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-link-default hover:underline hover:text-link-hover block"
                    >
                      {project.title}
                    </Link>
                    <p className="text-sm text-text-subtle">
                      Updated: {formatDate(project.date)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href="/projects"
                  className="text-sm text-link-default hover:underline"
                >
                  View all projects &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
