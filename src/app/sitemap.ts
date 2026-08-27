import { MetadataRoute } from 'next';
import { getBrands, getArticles } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://keovip247.com';

  const [brands, articles] = await Promise.all([
    getBrands(),
    getArticles(),
  ]);

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/top-nha-cai`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cong-game`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/khuyen-mai`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/soi-keo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/huong-dan`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic brand review routes
  const brandRoutes: MetadataRoute.Sitemap = brands
    .filter((b) => b.status !== 'inactive')
    .map((brand) => ({
      url: `${baseUrl}/review/${brand.slug}`,
      lastModified: new Date(brand.updatedAt || new Date()),
      changeFrequency: 'weekly',
      priority: 0.85,
    }));

  // Dynamic article routes
  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((a) => a.status !== 'draft')
    .map((article) => ({
      url: `${baseUrl}/bai-viet/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.createdAt),
      changeFrequency: 'weekly',
      priority: 0.75,
    }));

  return [...staticRoutes, ...brandRoutes, ...articleRoutes];
}
