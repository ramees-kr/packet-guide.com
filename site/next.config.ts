// site/next.config.ts
import nextMDX from "@next/mdx";
// If you had 'import path from 'path';' and the webpack alias from our Vercel debug,
// you can remove those now as the path alias issue was resolved by the .gitignore fix.

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Add the images configuration here:
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "", // Default ports (80 for http, 443 for https)
        pathname: "/**", // Allow any path under this hostname
      },
      // You can add more domain patterns here if you use other image sources
      // For example:
      // {
      //   protocol: 'https',
      //   hostname: 'another-image-provider.com',
      //   pathname: '/assets/**',
      // },
    ],
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);
