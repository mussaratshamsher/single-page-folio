import { MetadataRoute } from 'next'
import profile from "@/components/ui/PortfolioData";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://mussarat-web-dev.vercel.app/"; 
  const currentDate = new Date();

  // Base pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = profile.projects.map((project) => ({
    url: `${siteUrl}projects/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    images: project.image ? [project.image.startsWith('http') ? project.image : `${siteUrl.replace(/\/$/, '')}${project.image}`] : undefined,
  }));

  return [...staticPages, ...projectPages];
}
