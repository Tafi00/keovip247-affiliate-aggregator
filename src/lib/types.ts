export type BrandCategory = 'nha-cai' | 'cong-game';

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  rating: number; // e.g. 4.9
  foundedYear: number;
  badge: string; // e.g. "Tặng 199k Tân Thủ"
  license: string; // e.g. "PAGCOR, Isle of Man"
  withdrawalSpeed: string; // e.g. "3 - 5 phút"
  minDeposit: string; // e.g. "50.000 VNĐ"
  bonus: string; // e.g. "Thưởng 100% nạp đầu lên tới 5.000.000đ"
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  reviewSlug: string;
  category: BrandCategory;
  order: number;
  clickCount: number;
  isFeatured: boolean;
  status: 'active' | 'inactive';
  updatedAt: string;
}

export type ArticleCategory =
  | 'top-nha-cai'
  | 'cong-game'
  | 'khuyen-mai'
  | 'soi-keo'
  | 'huong-dan';

export interface ArticleSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: ArticleCategory;
  thumbnail: string;
  summary: string;
  content: string; // Markdown content
  author: string;
  brandId?: string; // If this article is a review for a specific brand
  views: number;
  seo: ArticleSEO;
  createdAt: string;
  updatedAt: string;
  status: 'published' | 'draft';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface SiteSettings {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  logo: string;
  hotline: string;
  telegram: string;
  zalo: string;
  email: string;
  footerDisclaimer: string;
  announcementBar: string;
  heroTitle: string;
  heroSubtitle: string;
}

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}
