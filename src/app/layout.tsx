import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import profile from "@/components/ui/PortfolioData";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://mussarat-web-dev.vercel.app/"; 

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  icons: {
    icon: "/logo.png", 
    apple: "/logo.png", 
    shortcut: "/logo.png", 
    other: [ { rel: 'apple-touch-icon-precomposed', url: '/logo.png' } ]
  },
  description: profile.tagline,
  keywords: [
    "Full-Stack Developer",
    "AI Integrator",
    "Next.js",
    "Python",
    "FastAPI",
    "AI Agents",
    "Mussarat Shamsher",
    "freelance developer Pakistan"
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    url: siteUrl,
    siteName: profile.name,
    images: [
      { url: "/og-image.png", alt: `${profile.name}'s Portfolio` },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    creator: "@MussaratShams",
    images: [
      { url: "/og-image.png", alt: `${profile.name}'s Portfolio` },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
