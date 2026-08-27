import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Trophy,
  ShieldCheck,
  Gamepad2,
  Gift,
  TrendingUp,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import { getBrands, getArticles } from '@/lib/db';
import BrandCard from '@/components/brands/BrandCard';
import BrandRankingTable from '@/components/brands/BrandRankingTable';
import ArticleCard from '@/components/articles/ArticleCard';
import { ArticleCategory, BrandCategory } from '@/lib/types';

interface CategoryConfig {
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  icon: React.ElementType;
  brandCategory?: BrandCategory;
  articleCategory?: ArticleCategory;
}

const CATEGORY_MAP: Record<string, CategoryConfig> = {
  'top-nha-cai': {
    title: 'Bảng Xếp Hạng Top Nhà Cái Uy Tín Nhất 2026',
    subtitle: 'Tổng hợp danh sách các nhà cái cá cược bóng đá, casino trực tuyến hợp pháp, nạp rút siêu tốc và thưởng tân thủ 200%.',
    metaTitle: 'Top Nhà Cái Uy Tín Nhất Việt Nam 2026 - Bảng Xếp Hạng Chuẩn',
    metaDescription: 'Danh sách top nhà cái uy tín số 1 Việt Nam hiện nay. Cập nhật link vào mới nhất, bảo mật tuyệt đối và tặng tiền cược miễn phí.',
    icon: ShieldCheck,
    brandCategory: 'nha-cai',
    articleCategory: 'top-nha-cai',
  },
  'cong-game': {
    title: 'Top Cổng Game Bài Đổi Thưởng Uy Tín 2026',
    subtitle: 'Đánh giá các cổng game bài Tài Xỉu MD5, Nổ Hũ Jackpot, Bắn Cá đổi thưởng 1:1 không mất phí qua ngân hàng và ví điện tử.',
    metaTitle: 'Top Cổng Game Bài Đổi Thưởng Uy Tín 2026 - Link Tải Chuẩn',
    metaDescription: 'Bảng xếp hạng cổng game bài đổi thưởng nhiều người chơi nhất: Sunwin, Go88, Rikvip... Tải link chuẩn iOS/Android/APK tặng code 50k.',
    icon: Gamepad2,
    brandCategory: 'cong-game',
    articleCategory: 'cong-game',
  },
  'khuyen-mai': {
    title: 'Tổng Hợp Khuyến Mãi Nhà Cái & Giftcode Tân Thủ',
    subtitle: 'Săn tiền cược miễn phí, code trải nghiệm 199k, thưởng 100% nạp đầu và hoàn trả không giới hạn mỗi ngày.',
    metaTitle: 'Khuyến Mãi Nhà Cái 2026 - Tặng Tiền Cược Miễn Phí & Thưởng Nạp',
    metaDescription: 'Cập nhật khuyến mãi cá cược hot nhất: Tặng freebet tân thủ, hoàn trả casino thể thao và giftcode cổng game hàng ngày.',
    icon: Gift,
    articleCategory: 'khuyen-mai',
  },
  'soi-keo': {
    title: 'Cẩm Nang & Bí Quyết Soi Kèo Bóng Đá Chuẩn Xác',
    subtitle: 'Phân tích bảng tỷ lệ kèo châu Á (Handicap), kèo Tài Xỉu, nhận định trước trận đấu từ các chuyên gia hàng đầu.',
    metaTitle: 'Kinh Nghiệm Soi Kèo Bóng Đá - Nhận Định Kèo Nhà Cái Hôm Nay',
    metaDescription: 'Hướng dẫn soi kèo bóng đá trực tuyến, cách đọc biến động kèo nhà cái và chiến thuật quản lý vốn cược hiệu quả.',
    icon: TrendingUp,
    articleCategory: 'soi-keo',
  },
  'huong-dan': {
    title: 'Hướng Dẫn Cá Cược & Nạp Rút Tiền An Toàn',
    subtitle: 'Chi tiết từng bước đăng ký tài khoản, nạp rút tiền qua VietQR, Momo và Crypto USDT ẩn danh không lo bị chặn.',
    metaTitle: 'Hướng Dẫn Cá Cược Online - Cách Nạp Rút Tiền Nhà Cái 2026',
    metaDescription: 'Bộ cẩm nang hướng dẫn tham gia cá cược trực tuyến: đăng ký, xác minh tài khoản và nạp rút tiền bảo mật tuyệt đối.',
    icon: BookOpen,
    articleCategory: 'huong-dan',
  },
};

export async function generateMetadata(
  props: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await props.params;
  const config = CATEGORY_MAP[category];

  if (!config) {
    return {
      title: 'Không Tìm Thấy Trang',
    };
  }

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
    },
  };
}

export default async function CategoryPage(
  props: { params: Promise<{ category: string }> }
) {
  const { category } = await props.params;
  const config = CATEGORY_MAP[category];

  if (!config) {
    notFound();
  }

  const [brands, articles] = await Promise.all([
    getBrands(),
    getArticles(),
  ]);

  const Icon = config.icon;

  // Filter brands and articles
  const matchingBrands = config.brandCategory
    ? brands.filter((b) => b.category === config.brandCategory && b.status !== 'inactive')
    : brands.filter((b) => b.status !== 'inactive').slice(0, 4);

  const matchingArticles = config.articleCategory
    ? articles.filter((a) => a.category === config.articleCategory && a.status !== 'draft')
    : articles.filter((a) => a.status !== 'draft');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-amber-400 transition">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-amber-400 font-semibold">{config.title}</span>
      </nav>

      {/* Category Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-10 text-center relative overflow-hidden">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/10 text-amber-400 mb-4 border border-amber-500/20">
          <Icon className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight max-w-3xl mx-auto">
          {config.title}
        </h1>
        <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto mt-3">
          {config.subtitle}
        </p>
      </div>

      {/* Brands List (if applicable) */}
      {config.brandCategory && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              Danh Sách Xếp Hạng {config.brandCategory === 'nha-cai' ? 'Nhà Cái' : 'Cổng Game'}
            </h2>
          </div>

          <div className="space-y-4">
            {matchingBrands.map((brand, index) => (
              <BrandCard key={brand.id} brand={brand} rank={index + 1} />
            ))}
          </div>

          {/* Comparison Table */}
          <div className="pt-8">
            <BrandRankingTable brands={matchingBrands} />
          </div>
        </section>
      )}

      {/* Articles Section */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-400" />
          Bài Viết & Hướng Dẫn Liên Quan
        </h2>

        {matchingArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchingArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">Đang cập nhật bài viết mới...</p>
        )}
      </section>
    </div>
  );
}
