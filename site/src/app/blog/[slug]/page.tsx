// site/src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostData } from "@/lib/content";
import { mdxCustomComponents } from "@/mdx-components";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
// import remarkGfm from 'remark-gfm'; // Example plugin

// Update Props type: params is now a Promise
type Props = {
  params: Promise<{
    // <-- Changed to Promise
    slug: string;
  }>;
};

export async function generateMetadata(
  { params: paramsPromise }: Props, // Rename to paramsPromise for clarity
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await paramsPromise; // Await the params promise
  const post = await getPostData(params.slug);

  await _parent;

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The post you are looking for does not exist.",
    };
  }

  return {
    title: `${post.title} | Packet Guide Blog`,
    description: post.excerpt,
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      url: `/blog/${params.slug}`, // Use awaited params.slug
    },
    keywords: post.tags,
  };
}

export async function generateStaticParams() {
  // This function returns a direct object array, which is correct.
  // Next.js uses this to know the possible values for the params promise.
  const slugs = getAllPostSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function BlogPostPage({ params: paramsPromise }: Props) {
  // Rename to paramsPromise
  const params = await paramsPromise; // Await the params promise
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  const components = mdxCustomComponents;

  const mdxOptions = {
    remarkPlugins: [
      // remarkGfm,
    ],
    rehypePlugins: [],
  };

  return (
    <article className="py-12">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text-default mb-3">
            {post.title}
          </h1>
          <div className="text-md text-text-subtle flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-2 sm:space-y-0 sm:space-x-3">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.author && (
              <>
                <span className="hidden sm:inline">&bull;</span>
                <span>By {post.author}</span>
              </>
            )}
            <>
              <span className="hidden sm:inline">&bull;</span>
              <span>{post.readingTime}</span>
            </>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-200 dark:bg-gray-700 text-text-subtle dark:text-gray-300 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose dark:prose-invert max-w-readable mx-auto">
          <MDXRemote
            source={post.source}
            options={{ mdxOptions }}
            components={components}
          />
        </div>

        <div className="mt-12 text-center">
          <Link href="/blog" className="text-link-default hover:underline">
            &larr; Back to all articles
          </Link>
        </div>
      </div>
    </article>
  );
}
