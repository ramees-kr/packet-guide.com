// site/src/app/about/page.tsx
import { getPageContent } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxCustomComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Packet Guide",
  description: "Learn more about Packet Pilot, the creator of Packet Guide.",
  // You can add more specific metadata later if needed
};

export default async function AboutPage() {
  const pageContent = await getPageContent("whoami"); // Fetches whoami.md

  if (!pageContent || !pageContent.source) {
    notFound(); // Render 404 if content is not found
  }

  const components = mdxCustomComponents;
  const mdxOptions = {
    // Define MDX options for plugins (empty for now)
    remarkPlugins: [],
    rehypePlugins: [],
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* The h1 and other headings will come from your whoami.md content */}
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
