// site/src/components/layout/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 mt-auto border-t border-surface-background text-center">
      {" "}
      {/* Increased py-8 for a bit more space */}
      <div className="container mx-auto px-4">
        {/* Social Links Placeholder */}
        <div className="mb-4">
          <a
            href="https://github.com/ramees-kr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-subtle hover:text-link-default transition-colors mx-2"
          >
            GitHub
          </a>
          <span className="text-text-subtle">|</span>
          <a
            href="https://www.linkedin.com/in/rameeskr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-subtle hover:text-link-default transition-colors mx-2"
          >
            LinkedIn
          </a>
          <span className="text-text-subtle">|</span>
          <a
            href="https://x.com/ramees_kr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-subtle hover:text-link-default transition-colors mx-2"
          >
            Twitter/X
          </a>
        </div>

        {/* Copyright */}
        <p className="text-text-subtle text-sm">
          &copy; {currentYear} Packet Guide. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
