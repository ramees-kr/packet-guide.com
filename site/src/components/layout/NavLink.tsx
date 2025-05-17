// site/src/components/layout/NavLink.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // Add optional onClick prop
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className,
  onClick,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClasses =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out";
  const activeClasses =
    "text-link-default bg-surface-background dark:bg-gray-700";
  const inactiveClasses =
    "text-text-subtle hover:text-text-default dark:hover:text-white";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${
        isActive ? activeClasses : inactiveClasses
      } ${className || ""}`}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick} // Call the onClick handler if provided
    >
      {children}
    </Link>
  );
};

export default NavLink;
