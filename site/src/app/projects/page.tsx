// site/src/app/projects/page.tsx
import { getSortedProjectsData, ProjectData } from "@/lib/content";
import ProjectCard from "@/components/ui/ProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Packet Guide",
  description: "A selection of projects by Packet Guide.",
};

export default function ProjectsIndexPage() {
  const projects: ProjectData[] = getSortedProjectsData();

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-text-default mb-12 text-center">
          My Projects
        </h1>

        {projects.length === 0 ? (
          <p className="text-center text-text-subtle">
            No projects listed yet. Please check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
