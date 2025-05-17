// site/src/app/blog/page.tsx
import { getSortedPostsData, PostMeta } from "@/lib/content";
import BlogCard from "@/components/ui/BlogCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Packet Guide",
  description: "Read the latest articles and insights from Packet Guide.",
};

export default function BlogIndexPage() {
  const posts: PostMeta[] = getSortedPostsData();

  return (
    <section className="py-8">
      {" "}
      {/* Overall padding for the blog section */}
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-text-default mb-12 text-center">
          Blog Articles
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-text-subtle">
            No blog posts found. Check back soon!
          </p>
        ) : (
          <div>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
