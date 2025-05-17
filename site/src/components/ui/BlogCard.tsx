// site/src/components/ui/BlogCard.tsx
import Link from "next/link";
import type { PostMeta } from "@/lib/content";

interface BlogCardProps {
  post: PostMeta;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="mb-8 p-6 rounded-lg bg-surface-background shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
      <header className="mb-3">
        <h2 className="text-2xl font-bold text-text-default mb-1">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-link-default transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        <div className="text-sm text-text-subtle flex items-center space-x-3">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>&bull;</span>
          <span>{post.readingTime}</span>
          {post.author && (
            <>
              <span>&bull;</span>
              <span>By {post.author}</span>
            </>
          )}
        </div>
      </header>
      <div className="text-text-default mb-4">
        <p>{post.excerpt}</p>
      </div>
      {post.tags && post.tags.length > 0 && (
        <footer className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-200 dark:bg-gray-700 text-text-subtle dark:text-gray-300 px-2 py-1 rounded"
            >
              {/* Later, these could be links to a tags page: <Link href={`/tags/${tag.toLowerCase()}`}>{tag}</Link> */}
              {tag}
            </span>
          ))}
        </footer>
      )}
    </article>
  );
};

export default BlogCard;
