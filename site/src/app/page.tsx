// site/src/app/page.tsx
export default function HomePage() {
  return (
    <div className="py-8">
      {" "}
      {/* Add some padding */}
      <h1 className="text-4xl font-bold text-text-default mb-6">
        Welcome to Packet Guide
      </h1>
      <div className="space-y-4 text-text-default">
        <p>
          This is the beginning of a minimalist developer portfolio and blog.
          The goal is to create a clean, fast, and distraction-free reading
          experience. We&apos;re currently setting up the foundational styles,{" "}
          {/* Changed We're to We&apos;re */}
          including the &quot;Inter&quot; font you&apos;re seeing now.{" "}
          {/* Changed you're to you&apos;re, and "Inter" to &quot;Inter&quot; just to be safe, though quotes within text are often fine unless they conflict with JSX attribute quotes. */}
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <p>
          Here&apos;s some <code>inline code</code> using the monospace font,
          and below is a preformatted block:{" "}
          {/* Changed Here's to Here&apos;s */}
        </p>
        <pre className="bg-surface-background p-4 rounded-md overflow-x-auto">
          <code>
            {`function greet(name) {
  console.log(\`Hello, \${name}!\`);
}`}
          </code>
        </pre>
        <p>
          We will continue to build out the site, focusing on content clarity
          and a simple, elegant design.
        </p>
      </div>
    </div>
  );
}
