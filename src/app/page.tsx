import React from 'react';
import Link from 'next/link';
import {
  Trophy,
  ShieldCheck,
  Zap,
  Gift,
  Clock,
  Award,
  Sparkles,
  TrendingUp,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { getBrands, getArticles, getFAQs, getSiteSettings } from '@/lib/db';
import HomeBrandSection from '@/components/brands/HomeBrandSection';
import BrandRankingTable from '@/components/brands/BrandRankingTable';
import ArticleCard from '@/components/articles/ArticleCard';
import FAQAccordion from '@/components/faq/FAQAccordion';

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const [brands, articles, faqs, settings] = await Promise.all([
    getBrands(),
    getArticles(),
    getFAQs(),
    getSiteSettings(),
  ]);

  const activeBrands = brands.filter((b) => b.status !== 'inactive');
  const recentArticles = articles.filter((a) => a.status !== 'draft').slice(0, 3);

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 border-b border-slate-800/80">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* VIP Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-amber-500/40 shadow-lg shadow-amber-500/10">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wider">
              {settings.heroBadge || 'Cập Nhật Tháng 8/2026 • Thẩm Định Độc Lập'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
            {settings.heroTitle || 'TOP 10 NHÀ CÁI UY TÍN NHẤT VIỆT NAM 2026'}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {settings.heroSubtitle ||
              'Kiểm định độc lập hơn 50+ nhà cái & cổng game. Cập nhật link vào mới nhất, bảo đảm an toàn, rút tiền siêu tốc 3 phút.'}
          </p>

          {/* Trust Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center hover:border-amber-500/30 transition">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-lg font-black text-white">{settings.stat1Value || '100%'}</span>
              <span className="text-xs text-slate-400">{settings.stat1Label || 'Giấy Phép Quốc Tế'}</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center hover:border-emerald-500/30 transition">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 mb-2">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-lg font-black text-white">{settings.stat2Value || '< 5 Phút'}</span>
              <span className="text-xs text-slate-400">{settings.stat2Label || 'Rút Tiền Siêu Tốc'}</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center hover:border-red-500/30 transition">
              <div className="p-2 rounded-xl bg-red-500/10 text-red-400 mb-2">
                <Gift className="w-6 h-6" />
              </div>
              <span className="text-lg font-black text-white">{settings.stat3Value || '199K Free'}</span>
              <span className="text-xs text-slate-400">{settings.stat3Label || 'Tặng Thưởng Tân Thủ'}</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center hover:border-sky-500/30 transition">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 mb-2">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-lg font-black text-white">{settings.stat4Value || '50.000+'}</span>
              <span className="text-xs text-slate-400">{settings.stat4Label || 'Cược Thủ Tin Chọn'}</span>
            </div>
          </div>

          {/* Optional Promo Banner */}
          {settings.promoBannerUrl && (
            <div className="pt-6 max-w-4xl mx-auto">
              <Link
                href={settings.promoBannerLink || '/top-nha-cai'}
                className="block overflow-hidden rounded-2xl border border-amber-500/40 shadow-2xl hover:border-amber-400 transition group"
              >
                <img
                  src={settings.promoBannerUrl}
                  alt="Khuyến Mãi Đặc Biệt"
                  className="w-full h-auto max-h-[220px] object-cover group-hover:scale-[1.02] transition duration-300"
                />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 2. RANKED BRAND CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Trophy className="w-7 h-7 text-amber-400" />
              Danh Sách Nhà Cái & Cổng Game Uy Tín
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Bảng điểm thẩm định độc lập theo 6 tiêu chí an toàn & thanh toán.
            </p>
          </div>
        </div>

        {/* Interactive Filter and Cards List */}
        <HomeBrandSection initialBrands={activeBrands} />
      </section>

      {/* 3. TOP 10 COMPARISON TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <BrandRankingTable brands={activeBrands} />
      </section>

      {/* 4. LATEST ARTICLES & PROMOTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Cẩm Nang & Khuyến Mãi
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Bài Viết & Hướng Dẫn Mới Nhất
            </h2>
          </div>
          <Link
            href="/khuyen-mai"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-amber-400 hover:text-amber-300 transition"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 5. FAQ ACCORDION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion faqs={faqs} />
      </section>

      {/* 6. EDITORIAL SEO CONTENT BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 sm:p-10 space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-slate-800 pb-4">
            KEOVIP247 - Quy Chuẩn Đánh Giá & Xếp Hạng Nhà Cái Trực Tuyến
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-amber-400">
                1. Tính Pháp Lý & Giấy Phép Cờ Bạc Quốc Tế
              </h3>
              <p>
                Mọi nhà cái xuất hiện trên KEOVIP247 đều phải có trụ sở hợp pháp tại nước ngoài và được cấp phép bởi ít nhất một trong các tổ chức uy tín hàng đầu: <strong>PAGCOR (Philippines), Isle of Man GSC, Malta Gaming Authority (MGA)</strong> hoặc <strong>Curaçao eGaming</strong>. Giấy phép này đảm bảo nguồn vốn dồi dào, quyền lợi người chơi được pháp luật bảo hộ và kết quả trò chơi hoàn toàn minh bạch.
              </p>

              <h3 className="text-base font-bold text-amber-400">
                2. Tốc Độ Thanh Toán & Đa Dạng Kênh Nạp Rút
              </h3>
              <p>
                Thử nghiệm thực tế nạp rút tiền là điều kiện bắt buộc trong bài test của chúng tôi. Các nhà cái đạt chuẩn phải hỗ trợ nạp tiền tức thì qua <strong>VietQR, Momo, ZaloPay</strong> và đặc biệt là <strong>Crypto USDT (TRC20)</strong> để đảm bảo sự riêng tư và tốc độ rút tiền về dưới 5 phút.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-amber-400">
                3. Tỷ Lệ Cược (Odds) & Sảnh Cược Đỉnh Cao
              </h3>
              <p>
                Nhà cái tốt phải cung cấp bảng kèo phong phú từ bóng đá, bóng rổ, tennis cho đến thể thao điện tử (Esports). Sảnh Live Casino phải đến từ các nhà cung cấp chuẩn quốc tế như <strong>Evolution, Pragmatic Play, Sexy Baccarat</strong> với đường truyền HD sắc nét, không giật lag.
              </p>

              <h3 className="text-base font-bold text-amber-400">
                4. Cam Kết Chơi Có Trách Nhiệm (18+)
              </h3>
              <p>
                Chúng tôi khuyến cáo người chơi luôn giữ tâm lý giải trí lành mạnh, đặt ra ngân sách cố định hàng ngày và không vay mượn tiền để cá cược. KEOVIP247 hỗ trợ cung cấp đường dẫn an toàn và link dự phòng chính thống giúp người chơi tránh xa các trang web giả mạo lừa đảo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
