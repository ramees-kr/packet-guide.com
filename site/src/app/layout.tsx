// site/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "@/styles/globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ui/ThemeProvider"; // Import our ThemeProvider

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
  title: "Packet Guide",
  description: "Minimalist Developer Portfolio & Blog",
  // Add or update the 'icons' field:
  icons: {
    icon: [
      // Can be an array for multiple sizes/types or just one entry
      // If you also have a traditional favicon.ico in public/
      // { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
      { url: "/icon.svg", type: "image/svg+xml" }, // Points to site/src/app/icon.svg (served at /icon.svg)
    ],
    apple: [
      // For Apple touch icons
      { url: "/apple-icon.png" }, // Example: place apple-icon.png in site/src/app/ or site/public/
    ],
    // You can also add shortcut icons, etc.
  },
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
      suppressHydrationWarning // Keep this, it's good with next-themes too
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          // Optionally, you can disable transition animations on theme change to prevent flashes
          // disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
