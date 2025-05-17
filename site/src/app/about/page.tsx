// site/src/app/about/page.tsx
import { getPageContent } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxCustomComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Imports for syntax highlighting
import rehypePrettyCode from "rehype-pretty-code";
import type { Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
// Optional: For typing nodes in rehype-pretty-code callbacks
// import type { LineElement, CharsElement } from 'rehype-pretty-code';

export const metadata: Metadata = {
  title: "About Me | Packet Guide",
  description: "Learn more about Packet Pilot, the creator of Packet Guide.",
};

export default async function AboutPage() {
  const pageContent = await getPageContent("whoami"); // Fetches whoami.md

  if (!pageContent || !pageContent.source) {
    notFound();
  }

  const components = mdxCustomComponents;

  // Options for rehype-pretty-code
  const prettyCodeOptions: RehypePrettyCodeOptions = {
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
    onVisitLine(node /*: LineElement */) {
      if (node.children.length === 0) {
        node.children = [{ type: "text", value: " " }];
      }
    },
    onVisitHighlightedLine(node /*: LineElement */) {
      if (!node.properties) node.properties = {};
      node.properties.className = Array.isArray(node.properties.className)
        ? [...node.properties.className, "highlighted"]
        : ["highlighted"];
    },
    onVisitHighlightedChars(node /*: CharsElement */) {
      if (!node.properties) node.properties = {};
      node.properties.className = ["highlighted-chars"];
    },
    keepBackground: true,
  };

  const mdxOptions = {
    remarkPlugins: [],
    rehypePlugins: [() => rehypePrettyCode(prettyCodeOptions)],
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
