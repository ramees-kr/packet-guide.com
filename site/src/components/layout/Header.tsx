// site/src/components/layout/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle"; // Import ThemeToggle

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  //{ href: "/roadmap", label: "Roadmap" },
  //{ href: "/skills", label: "Skills" },
  //{ href: "/about", label: "About" },
];

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-page-background/90 backdrop-blur-md border-b border-surface-background">
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

          {/* Desktop Navigation & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {" "}
            {/* Group desktop nav and toggle */}
            <nav className="flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <ThemeToggle /> {/* Add ThemeToggle for desktop */}
          </div>

          {/* Mobile Controls: Theme Toggle and Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {" "}
            {/* Group mobile controls */}
            <ThemeToggle /> {/* Add ThemeToggle for mobile */}
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
              <NavLink
                key={item.href}
                href={item.href}
                className="block !px-3 !py-2 !text-base"
                onClick={handleMobileLinkClick}
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
