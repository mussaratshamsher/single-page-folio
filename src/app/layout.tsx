import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import profile from "@/components/ui/PortfolioData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientChatbot from "@/components/ClientChatbot";
import { FramerProvider } from "@/components/FramerProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
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
    "Agentic AI Developer",
    "AI Workflow Automation Specialist",
    "Custom AI Agent Development",
    "Hire Full-Stack AI Developer Pakistan",
    "Next.js AI Integration Services",
    "Retrieval-Augmented Generation (RAG) Expert",
    "Full-Stack Developer",
    "Python",
    "FastAPI",
    "Mussarat Shamsher"
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl.replace(/\/$/, ""),
    image: `${siteUrl.replace(/\/$/, "")}/og-image.png`,
    jobTitle: profile.role,
    description: profile.tagline,
    email: profile.email,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    sameAs: [
      profile.socials.facebook,
      profile.socials.linkedin,
      profile.socials.twitter,
    ],
    knowsAbout: [
      "Agentic AI",
      "Full-Stack Development",
      "Next.js",
      "Python",
      "FastAPI",
      "Prompt Engineering",
      "AI Agent Development",
      "RAG",
      "SEO Optimization",
    ],
  };

  return (
    <html lang="en" className="!scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FramerProvider>
          <Navbar />
          {children}
          <Footer />
        </FramerProvider>
        <ClientChatbot />
      </body>
    </html>
  );
}
