// site/src/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
// Optionally import Next.js Image component if you plan to use it for images in MDX
// import Image, { ImageProps } from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Default H1: Add some basic styling or leave as is
    // h1: ({ children }) => <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{children}</h1>,

    // Example: Use Next.js Image for `img` tags
    // If you use this, ensure your MDX image syntax provides width and height,
    // or you handle it appropriately here.
    // img: (props) => (
    //   <Image
    //     sizes="100vw"
    //     style={{ width: '100%', height: 'auto' }}
    //     {...(props as ImageProps)} // Cast props to ImageProps
    //     alt={props.alt || ""} // Ensure alt text is present
    //   />
    // ),

    // You can add other custom components here:
    // p: ({ children }) => <p className="my-custom-paragraph-class">{children}</p>,
    // a: ({ children, href }) => <a href={href} className="text-link-default hover:underline">{children}</a>,

    // Spread the rest of the default components to keep their default behavior
    // or any components passed in from `next-mdx-remote`
    ...components,
  };
}
