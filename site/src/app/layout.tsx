// site/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "@/styles/globals.css";

// Import Header and Footer components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "700"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Packet Guide", // Basic site title
  description: "Minimalist Developer Portfolio & Blog", // Basic site description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} antialiased`}
      suppressHydrationWarning // Added for good practice
    >
      <body>
        <div className="flex flex-col min-h-screen">
          {" "}
          {/* Flex container for sticky footer */}
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {" "}
            {/* Main content area */}
            {/* The py-8 on main provides top/bottom padding for content areas.
                The py-4 on Header and py-6 on Footer are their own padding.
                The existing py-8 on your HomePage component might now be
                slightly redundant or create double padding. You can adjust
                padding on individual pages or here as needed once you see it.
            */}
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
