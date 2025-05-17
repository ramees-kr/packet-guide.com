// site/src/components/layout/NavLink.tsx
import React from "react";
import Link from "next/link"; // Using Next.js Link for client-side navigation

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string; // Allow passing additional classes
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className }) => {
  // Active state logic will be added later (Phase 3.4)
  // For now, it's a simple link

  return (
    <Link
      href={href}
      className={`text-text-default hover:text-link-default transition-colors duration-150 ${
        className || ""
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
