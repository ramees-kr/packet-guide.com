// site/src/components/ui/ThemeToggle.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5 stroke-current"
  >
    <path
      d="M12 3V4M12 20V21M4 12H3M6.314 6.314L5.5 5.5M17.686 6.314L18.5 5.5M6.314 17.69L5.5 18.5M17.686 17.69L18.5 18.5M21 12H20"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 12C16 14.209 14.209 16 12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-current"
  >
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
  </svg>
);

const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder to prevent layout shift and hydration errors for the button icon
    return <div style={{ width: "2.25rem", height: "2.25rem" }} />; // Adjust size to match your button
  }

  const toggleUserPreference = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const buttonLabel =
    resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      onClick={toggleUserPreference}
      aria-label={buttonLabel}
      title={buttonLabel}
      className="p-2 rounded-md text-text-subtle hover:text-text-default hover:bg-surface-background transition-colors duration-150"
    >
      {/* Icon shows the current effective theme: Sun for light, Moon for dark */}
      {resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeToggle;
