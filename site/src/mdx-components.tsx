// site/src/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import Image from "next/image"; // Import Next.js Image component

// Custom Image component to use Next.js <Image> for `img` tags in MDX
const MdxImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  // Destructure common img attributes.
  // `width` and `height` from HTML attributes are destructured here to prevent
  // them from being passed directly to Next.js <Image> when `fill` is true,
  // as their types can conflict and they are not used by <Image> in fill mode.
  const { src, alt, width, height, ...otherProps } = props;

  // Check if src is a valid string for local (starts with /) or external (starts with http) images.
  if (
    typeof src === "string" &&
    (src.startsWith("/") || src.startsWith("http"))
  ) {
    return (
      // This span acts as the relatively positioned parent for the `fill` Image.
      // `aspect-video` gives a default 16:9 aspect ratio. You can change this
      // (e.g., `aspect-square`, `aspect-[4/3]`) or remove it if you want the
      // image's natural aspect ratio (requires the image to have intrinsic dimensions
      // or the parent to be sized differently).
      <span className="block my-6 relative aspect-video">
        <Image
          src={src}
          alt={alt || "Content image"} // Always provide meaningful alt text in your MDX.
          fill // The `fill` prop makes the image responsive and fill its parent (the span).
          style={{ objectFit: "contain" }} // 'cover' ensures the image covers the entire span.
          // Other options: 'cover', 'fill' (as in prop name), 'none', 'scale-down'.
          className="rounded-md" // Optional: adds rounded corners to your images.
          {...otherProps} // Spreads any other valid HTML attributes (like title, id) to the Image.
        />
      </span>
    );
  }

  // Fallback to a standard HTML <img> tag if:
  // - `src` is not a string.
  // - `src` is a string but doesn't look like a typical path (e.g., data URI that next/image might not handle well without config).
  // - Or for any other reason next/image might not be suitable for a particular src.
  // The original width and height attributes (if provided in MDX like <img width="X">) can be used here.
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt || "Content image"}
      width={width}
      height={height}
      {...otherProps}
    />
  );
};

// This is where you map Markdown/MDX elements to your custom React components.
export const mdxCustomComponents: MDXComponents = {
  // Map the standard `img` HTML tag (generated from ![]() in Markdown)
  // to our custom MdxImage component.
  img: MdxImage,

  // You can add other custom component mappings here in the future. For example:
  // a: (props) => <a className="text-link-default hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
  // p: (props) => <p className="my-4 leading-relaxed">{...props} />,
  // Custom components you create (e.g., <Callout type="info">...</Callout>) would also be mapped here if used in MDX.
};
