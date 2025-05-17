// site/src/components/layout/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6 mt-auto border-t border-surface-background">
      {" "}
      {/* Basic styling & push to bottom */}
      <div className="container mx-auto px-4 text-center">
        <p className="text-text-subtle text-sm">
          &copy; {currentYear} Packet Guide. All Rights Reserved.
        </p>
        {/* We can add more links or information here later */}
      </div>
    </footer>
  );
};

export default Footer;
