// site/src/components/layout/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="py-4 border-b border-surface-background">
      {" "}
      {/* Basic styling */}
      <div className="container mx-auto px-4">
        {" "}
        {/* Centering and padding */}
        <p className="text-text-default">
          Header Placeholder (e.g., Site Title & Nav)
        </p>
        {/* We will add NavLink components and actual navigation structure later */}
      </div>
    </header>
  );
};

export default Header;
