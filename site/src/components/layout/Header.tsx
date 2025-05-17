// site/src/components/layout/Header.tsx
"use client";

import React, { useState, useEffect } from "react"; // Import useState and useEffect
import Link from "next/link";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation"; // Import usePathname to close menu on route change

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
];

// Icons for the mobile menu button
const MenuIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to be called by NavLinks in the mobile menu to ensure it closes
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-page-background/75 backdrop-blur-md border-b border-surface-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Site Title / Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-text-default hover:text-link-default transition-colors"
            >
              Packet Guide
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-md text-text-subtle hover:text-text-default hover:bg-surface-background focus:outline-none focus:ring-2 focus:ring-inset focus:ring-link-default"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel - Conditionally rendered */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-page-background shadow-lg border-t border-surface-background">
          <nav className="flex flex-col space-y-1 px-2 pt-2 pb-3">
            {navItems.map((item) => (
              // Wrap NavLink or add onClick to NavLink itself if it supports it
              // For simplicity, we'll assume NavLink doesn't directly take onClick for this state management.
              // So, we wrap it or modify NavLink if needed.
              // For this implementation, let's make NavLink take an optional onClick.
              <NavLink
                key={item.href}
                href={item.href}
                className="block !px-3 !py-2 !text-base" // Override NavLink's internal padding for mobile list
                onClick={handleMobileLinkClick} // Add this to NavLink props or handle differently
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
