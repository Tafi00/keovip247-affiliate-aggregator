import { Redis } from '@upstash/redis';
import { Brand, Article, FAQ, SiteSettings } from './types';
import {
  INITIAL_BRANDS,
  INITIAL_ARTICLES,
  INITIAL_FAQS,
  INITIAL_SETTINGS,
} from './initial-data';

// Upstash Redis Client initialization if env vars exist
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const redis = redisUrl && redisToken
  ? new Redis({
      url: redisUrl,
      token: redisToken,
    })
  : null;

// In-memory fallback cache
let memoryBrands: Brand[] = [...INITIAL_BRANDS];
let memoryArticles: Article[] = [...INITIAL_ARTICLES];
let memoryFAQs: FAQ[] = [...INITIAL_FAQS];
let memorySettings: SiteSettings = { ...INITIAL_SETTINGS };

// --- BRANDS ---
export async function getBrands(): Promise<Brand[]> {
  try {
    if (redis) {
      const data = await redis.get<Brand[]>('app:brands');
      if (data && Array.isArray(data) && data.length > 0) {
        return data.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
      // initialize Redis with initial data
      await redis.set('app:brands', INITIAL_BRANDS);
      return [...INITIAL_BRANDS].sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  } catch (error) {
    console.warn('Redis read error for brands, falling back to memory store:', error);
  }
  return [...memoryBrands].sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const brands = await getBrands();
  return brands.find((b) => b.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export async function getBrandById(id: string): Promise<Brand | null> {
  const brands = await getBrands();
  return brands.find((b) => b.id === id) || null;
}

export async function saveBrand(brand: Brand): Promise<Brand> {
  const brands = await getBrands();
  const index = brands.findIndex((b) => b.id === brand.id);
  
  if (index >= 0) {
    brands[index] = { ...brand, updatedAt: new Date().toISOString() };
  } else {
    brands.push({
      ...brand,
      id: brand.id || `brand-${Date.now()}`,
      clickCount: brand.clickCount || 0,
      updatedAt: new Date().toISOString(),
    });
  }

  brands.sort((a, b) => (a.order || 0) - (b.order || 0));

  if (redis) {
    try {
      await redis.set('app:brands', brands);
    } catch (err) {
      console.warn('Redis write error for saveBrand:', err);
    }
  }
  memoryBrands = brands;
  return brand;
}

export async function deleteBrand(id: string): Promise<boolean> {
  let brands = await getBrands();
  brands = brands.filter((b) => b.id !== id);

  if (redis) {
    try {
      await redis.set('app:brands', brands);
    } catch (err) {
      console.warn('Redis delete error for deleteBrand:', err);
    }
  }
  memoryBrands = brands;
  return true;
}

export async function incrementClick(brandSlug: string): Promise<number> {
  const brands = await getBrands();
  const brand = brands.find((b) => b.slug.toLowerCase() === brandSlug.toLowerCase());

  if (brand) {
    brand.clickCount = (brand.clickCount || 0) + 1;
    if (redis) {
      try {
        await redis.set('app:brands', brands);
        await redis.incr(`clicks:${brandSlug.toLowerCase()}`);
      } catch (err) {
        console.warn('Redis click incr error:', err);
      }
    }
    memoryBrands = brands;
    return brand.clickCount;
  }
  return 0;
}

export async function resetAllClicks(): Promise<boolean> {
  const brands = await getBrands();
  brands.forEach((b) => {
    b.clickCount = 0;
  });

  if (redis) {
    try {
      await redis.set('app:brands', brands);
      const keys = await redis.keys('clicks:*');
      if (keys && keys.length > 0) {
        await Promise.all(keys.map((k) => redis.del(k)));
      }
    } catch (err) {
      console.warn('Redis reset clicks error:', err);
    }
  }
  memoryBrands = brands;
  return true;
}

// --- ARTICLES ---
export async function getArticles(): Promise<Article[]> {
  try {
    if (redis) {
      const data = await redis.get<Article[]>('app:articles');
      if (data && Array.isArray(data) && data.length > 0) {
        return data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      await redis.set('app:articles', INITIAL_ARTICLES);
      return [...INITIAL_ARTICLES];
    }
  } catch (error) {
    console.warn('Redis read error for articles, falling back to memory store:', error);
  }
  return [...memoryArticles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find((a) => a.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export async function getArticleById(id: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find((a) => a.id === id) || null;
}

export async function saveArticle(article: Article): Promise<Article> {
  const articles = await getArticles();
  const index = articles.findIndex((a) => a.id === article.id);

  if (index >= 0) {
    articles[index] = {
      ...article,
      updatedAt: new Date().toISOString(),
    };
  } else {
    articles.unshift({
      ...article,
      id: article.id || `art-${Date.now()}`,
      views: article.views || 0,
      createdAt: article.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  if (redis) {
    try {
      await redis.set('app:articles', articles);
    } catch (err) {
      console.warn('Redis write error for saveArticle:', err);
    }
  }
  memoryArticles = articles;
  return article;
}

export async function deleteArticle(id: string): Promise<boolean> {
  let articles = await getArticles();
  articles = articles.filter((a) => a.id !== id);

  if (redis) {
    try {
      await redis.set('app:articles', articles);
    } catch (err) {
      console.warn('Redis delete error for deleteArticle:', err);
    }
  }
  memoryArticles = articles;
  return true;
}

export async function incrementArticleViews(slug: string): Promise<number> {
  const articles = await getArticles();
  const article = articles.find((a) => a.slug.toLowerCase() === slug.toLowerCase());
  if (article) {
    article.views = (article.views || 0) + 1;
    if (redis) {
      try {
        await redis.set('app:articles', articles);
      } catch (err) {
        console.warn('Redis article view error:', err);
      }
    }
    memoryArticles = articles;
    return article.views;
  }
  return 0;
}

// --- FAQS ---
export async function getFAQs(): Promise<FAQ[]> {
  try {
    if (redis) {
      const data = await redis.get<FAQ[]>('app:faqs');
      if (data && Array.isArray(data) && data.length > 0) {
        return data.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
      await redis.set('app:faqs', INITIAL_FAQS);
      return [...INITIAL_FAQS];
    }
  } catch (error) {
    console.warn('Redis read error for faqs, falling back to memory store:', error);
  }
  return [...memoryFAQs].sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function saveFAQ(faq: FAQ): Promise<FAQ> {
  const faqs = await getFAQs();
  const index = faqs.findIndex((f) => f.id === faq.id);

  if (index >= 0) {
    faqs[index] = faq;
  } else {
    faqs.push({
      ...faq,
      id: faq.id || `faq-${Date.now()}`,
    });
  }

  faqs.sort((a, b) => (a.order || 0) - (b.order || 0));

  if (redis) {
    try {
      await redis.set('app:faqs', faqs);
    } catch (err) {
      console.warn('Redis write error for saveFAQ:', err);
    }
  }
  memoryFAQs = faqs;
  return faq;
}

export async function deleteFAQ(id: string): Promise<boolean> {
  let faqs = await getFAQs();
  faqs = faqs.filter((f) => f.id !== id);

  if (redis) {
    try {
      await redis.set('app:faqs', faqs);
    } catch (err) {
      console.warn('Redis delete error for deleteFAQ:', err);
    }
  }
  memoryFAQs = faqs;
  return true;
}

// --- SITE SETTINGS ---
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    if (redis) {
      const data = await redis.get<SiteSettings>('app:settings');
      if (data && typeof data === 'object') {
        return { ...INITIAL_SETTINGS, ...data };
      }
      await redis.set('app:settings', INITIAL_SETTINGS);
      return { ...INITIAL_SETTINGS };
    }
  } catch (error) {
    console.warn('Redis read error for settings, falling back to memory store:', error);
  }
  return { ...memorySettings };
}

export async function saveSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const updated = { ...current, ...settings };

  if (redis) {
    try {
      await redis.set('app:settings', updated);
    } catch (err) {
      console.warn('Redis write error for saveSiteSettings:', err);
    }
  }
  memorySettings = updated;
  return updated;
}

// --- ANALYTICS & STATS ---
export async function getDashboardStats() {
  const [brands, articles, faqs] = await Promise.all([
    getBrands(),
    getArticles(),
    getFAQs(),
  ]);

  const totalClicks = brands.reduce((sum, b) => sum + (b.clickCount || 0), 0);
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);

  const topBrands = [...brands]
    .sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0))
    .slice(0, 5);

  return {
    totalBrands: brands.length,
    totalArticles: articles.length,
    totalFAQs: faqs.length,
    totalClicks,
    totalViews,
    topBrands,
  };
}
