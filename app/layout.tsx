import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppProviders } from "@/providers/AppProviders";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { Terminal } from "@/components/terminal/Terminal";
import { PageBackground } from "@/components/layout/PageBackground";
import { SITE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultTitle = `${SITE.name} — ${SITE.role} & Security Mindset`;

export const metadata: Metadata = {
  // Required for OG/Twitter images and canonical URLs to resolve absolutely.
  metadataBase: new URL(SITE.url),
  title: {
    template: `%s | ${SITE.name} - ${SITE.role}`,
    default: defaultTitle,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${SITE.name} — ${SITE.role}`,
    title: defaultTitle,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090B",
  colorScheme: "dark",
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
      <body className="relative flex min-h-full flex-col selection:bg-accent/30 selection:text-text-primary">
        <a
          href="#main"
          className="sr-only rounded-md border border-border-hover bg-surface px-4 py-2 text-sm text-text-primary focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200]"
        >
          Skip to content
        </a>
        <PageBackground />
        <AppProviders>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          {/* Global overlays — rendered outside the page scroll context */}
          <CommandPalette />
          <Terminal />
        </AppProviders>
      </body>
    </html>
  );
}
