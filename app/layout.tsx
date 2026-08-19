import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppProviders } from "@/providers/AppProviders";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { Terminal } from "@/components/terminal/Terminal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Maxime - Software Engineer",
    default: "Maxime - Software Engineer & Security Mindset",
  },
  description:
    "Portfolio of Maxime, Software Engineer building software that matters with a security mindset.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative selection:bg-accent/30 selection:text-text-primary">
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* Global overlays — rendered outside the page scroll context */}
          <CommandPalette />
          <Terminal />
        </AppProviders>
      </body>
    </html>
  );
}
