import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import profile from "@/components/ui/PortfolioData";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://your-portfolio-domain.com"; // Replace with your actual domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.tagline,
  keywords: ["Full-Stack Developer", "AI Integrator", "Next.js", "Python", "FastAPI", "AI Agents", "Mussarat Shamsher", "freelance developer Pakistan"],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    url: siteUrl,
    siteName: profile.name,
    images: [`${siteUrl}/og-image.png`], 
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    creator: '@MussaratShams', 
    images: [`${siteUrl}/og-image.png`], 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#020617' }, // slate-950
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        {/* Preload logo */}
        <link rel="preload" as="image" href="/logo.png" />
        <link rel="preload" as="image" href="/og-image.png" />
        {/* Preload local font */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/GeistVF.woff" crossOrigin="anonymous" />

        {/* Person Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": profile.name,
              "url": siteUrl,
              "image": `${siteUrl}/profile.jpg`, 
              "sameAs": [
                profile.socials.linkedin,
                profile.socials.twitter,
                profile.socials.facebook,
                "https://github.com/mussaratshamsher" 
              ],
              "jobTitle": profile.role,
              "worksFor": {
                "@type": "Organization",
                "name": "Innolyze",
                "url": "https://www.innolyze.com", 
                "logo": "https://www.innolyze.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.339d7fa4.png&w=1920&q=75" // ✅ Org Logo
              },
              "knowsAbout": ["Next.js", "React","TypeScript", "JavaScript", "Tailwind & CSS",  "Python", "FastAPI", "OpenAI Agents", "Full-Stack Development", "Graphic Design", "SEO"],
              "alumniOf": "GIAIC",
              "email": `mailto:${profile.email}`,
              "telephone": profile.phone,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": profile.location
              },
              "description": profile.tagline,
            }),
          }}
        />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
