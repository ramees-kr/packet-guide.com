// site/src/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
// Example: import Image, { ImageProps } from 'next/image';
// Example: import CustomLink from '@/components/ui/CustomLink'; // A custom link component

// Define your custom MDX components here
export const mdxCustomComponents: MDXComponents = {
  // Example: Override the default h1
  // h1: ({ children }) => <h1 className="text-3xl font-bold text-red-500">{children}</h1>,
  // Example: Use Next.js Image for `img` tags (requires careful prop handling)
  // img: (props) => {
  //   const { src, alt, width, height, ...rest } = props as any; // Basic example
  //   if (!src) return <img alt={alt || 'Image'} {...rest} />;
  //   return (
  //     <Image
  //       src={src}
  //       alt={alt || ""}
  //       width={Number(width) || 700} // Provide default or ensure MDX provides these
  //       height={Number(height) || 400} // Provide default or ensure MDX provides these
  //       className="rounded-md my-4" // Example styling
  //       {...rest}
  //     />
  //   );
  // },
  // Example: Use a custom link component for all anchor tags
  // a: (props) => <CustomLink href={props.href || '#'}>{props.children}</CustomLink>,
  // You can add more custom components for other HTML tags or custom shortcodes
  // p: (props) => <p className="text-lg leading-relaxed my-4">{props.children}</p>,
};

// The useMDXComponents function is not strictly needed if you export the object directly
// and don't need to merge components dynamically in this hook-like way for client components.
// For server components using MDXRemote, passing the object directly is cleaner.
// export function useMDXComponents(components: MDXComponents): MDXComponents {
//   return {
//     ...mdxCustomComponents, // Spread your globally defined custom components
//     ...components, // Spread any components passed in at the call site
//   };
// }
