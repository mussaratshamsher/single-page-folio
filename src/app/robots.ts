import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://mussarat-web-dev.vercel.app/"; 

  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: '/api/',
        crawlDelay: 10,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/*.png', '/*.jpg', '/*.jpeg', '/*.webp', '/*.avif'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: `${siteUrl}sitemap.xml`,
  }
}
