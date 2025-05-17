import nextMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // For example:
  // reactStrictMode: true,

  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [], // will add remark plugins here later
    rehypePlugins: [], // will add rehype plugins here later
    // providerImportSource: "@mdx-js/react", // Typically needed if you use MDXProvider explicitly
  },
});

// Export the combined config, which now includes MDX support
export default withMDX(nextConfig);
