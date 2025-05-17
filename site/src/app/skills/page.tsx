// site/src/app/skills/page.tsx
import { getPageContent } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxCustomComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | Packet Guide",
  description: "Overview of technical skills and expertise for Packet Guide.",
};

export default async function SkillsPage() {
  const pageContent = await getPageContent("skills_summary"); // Fetches skills_summary.md

  if (!pageContent || !pageContent.source) {
    notFound();
  }

  const components = mdxCustomComponents;
  const mdxOptions = {
    remarkPlugins: [],
    rehypePlugins: [],
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="prose dark:prose-invert max-w-readable mx-auto">
          <MDXRemote
            source={pageContent.source}
            options={{ mdxOptions }}
            components={components}
          />
        </div>
      </div>
    </section>
  );
}
