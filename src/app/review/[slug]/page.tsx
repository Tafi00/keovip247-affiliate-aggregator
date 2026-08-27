import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Star,
  ShieldCheck,
  Zap,
  Clock,
  Award,
  ExternalLink,
  Calendar,
  User,
} from 'lucide-react';
import { getBrands, getBrandBySlug, getArticles, getArticleBySlug } from '@/lib/db';
import { extractTOC, formatDate } from '@/lib/utils';
import ScoreWidget from '@/components/review/ScoreWidget';
import ProsCons from '@/components/review/ProsCons';
import TableOfContents from '@/components/review/TableOfContents';
import MarkdownRenderer from '@/components/articles/MarkdownRenderer';
import StickyMobileCTA from '@/components/review/StickyMobileCTA';
import BrandCard from '@/components/brands/BrandCard';

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    return { title: 'Không Tìm Thấy Nhà Cái' };
  }

  return {
    title: `Đánh Giá Nhà Cái ${brand.name} 2026 - Có Uy Tín Không? Link Cược Chuẩn`,
    description: `Review chi tiết nhà cái ${brand.name}: Đánh giá giấy phép ${brand.license}, tốc độ rút tiền ${brand.withdrawalSpeed}, khuyến mãi ${brand.bonus} và link đăng ký chính thức.`,
    openGraph: {
      title: `Đánh Giá Nhà Cái ${brand.name} - Review Chi Tiết 2026`,
      description: `Khám phá ưu nhược điểm, cách nạp rút và nhận ${brand.badge} tại ${brand.name}.`,
      images: [brand.logo],
    },
  };
}

export default async function BrandReviewPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  // Get associated review article if any or fallback to standard review markdown
  const articles = await getArticles();
  const linkedArticle = articles.find(
    (a) => a.brandId === brand.id || a.slug === brand.reviewSlug
  );

  const reviewContent = linkedArticle?.content || `
## 1. Giới thiệu tổng quan về thương hiệu ${brand.name}
${brand.name} là một trong những thương hiệu cá cược trực tuyến được đánh giá cao hàng đầu tại thị trường Việt Nam. Được thành lập từ năm **${brand.foundedYear}**, ${brand.name} đã nhanh chóng khẳng định vị thế vững chắc nhờ tiềm lực tài chính mạnh mẽ, hệ thống sản phẩm đa dạng và chất lượng dịch vụ chuyên nghiệp.

---

## 2. Giấy phép pháp lý và Cam kết Bảo mật
Độ uy tín của ${brand.name} được bảo chứng bởi các tổ chức kiểm định quốc tế hàng đầu:
- **Giấy phép hoạt động**: ${brand.license}.
- **Công nghệ mã hóa**: Trang bị giao thức SSL 256-bit cao cấp nhất, kết hợp bảo mật 2 lớp OTP xác thực giao dịch, cam kết dữ liệu người chơi được bảo vệ tuyệt đối.

---

## 3. Tốc độ Nạp & Rút Tiền Thực Tế
- **Thời gian xử lý nạp tiền**: Tự động từ 30 giây đến 2 phút qua VietQR, Momo, ViettelPay.
- **Thời gian rút tiền**: **${brand.withdrawalSpeed}** về tài khoản ngân hàng chính chủ.
- **Hỗ trợ Crypto**: Nạp rút qua đồng USDT (TRC20) ẩn danh, không giới hạn hạn mức.

---

## 4. Các Chương Trình Khuyến Mãi Đang Áp Dụng
Khi đăng ký tài khoản ${brand.name} qua hệ thống KEOVIP247, hội viên sẽ nhận ngay:
- **Gói chào mừng**: ${brand.bonus}.
- **Ưu đãi độc quyền**: ${brand.badge}.
- **Hoàn trả cược**: Tự động hoàn trả mỗi ngày từ 1.0% đến 1.5% không giới hạn doanh thu cược.

---

## 5. Kết Luận Đánh Giá từ Chuyên Gia KEOVIP247
Với điểm số ấn tượng **${brand.rating.toFixed(1)}/5.0**, ${brand.name} là sự lựa chọn an tâm và hoàn hảo cho cả tân thủ lẫn cược thủ chuyên nghiệp trong năm 2026.
  `;

  const toc = extractTOC(reviewContent);

  // Other alternative brands
  const allBrands = await getBrands();
  const alternativeBrands = allBrands
    .filter((b) => b.id !== brand.id && b.status !== 'inactive')
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-amber-400 transition">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/top-nha-cai" className="hover:text-amber-400 transition">
          Đánh giá nhà cái
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-amber-400 font-semibold">{brand.name}</span>
      </nav>

      {/* Review Header Banner */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
            Review Chi Tiết 2026
          </span>
          <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
            {brand.badge}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Đánh Giá Chi Tiết Nhà Cái {brand.name}: Giấy Phép, Khuyến Mãi & Nạp Rút
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-amber-400" />
            <span>Thẩm định bởi Ban Chuyên Môn Kèo VIP</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Cập nhật: {formatDate(brand.updatedAt || new Date().toISOString())}</span>
          </div>
        </div>
      </div>

      {/* Layout Grid: Left Content, Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Comprehensive Score Widget */}
          <ScoreWidget brand={brand} />

          {/* Pros & Cons */}
          <ProsCons pros={brand.pros} cons={brand.cons} />

          {/* Collapsible Table of Contents */}
          <TableOfContents items={toc} />

          {/* Editorial Content */}
          <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 p-6 sm:p-8">
            <MarkdownRenderer content={reviewContent} />
          </div>

          {/* Bottom Conversion CTA */}
          <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 border border-amber-500/40 rounded-2xl p-6 text-center space-y-4 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Sẵn sàng trải nghiệm cá cược đỉnh cao tại {brand.name}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Đăng ký tài khoản ngay hôm nay qua link đối tác chính thức để nhận trọn vẹn ưu đãi <strong>{brand.badge}</strong>.
            </p>
            <a
              href={`/go/${brand.slug}`}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-base text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-500/30 transition transform hover:scale-105"
            >
              <span>NHẬN KHUYẾN MÃI & CƯỢC NGAY</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Sidebar Area (1 col) */}
        <div className="space-y-6">
          {/* Sticky Quick Fact Card */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4 sticky top-24">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <Award className="w-5 h-5 text-amber-400" />
              Thông Tin Tổng Quan
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Tên thương hiệu:</span>
                <span className="font-bold text-white">{brand.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Năm thành lập:</span>
                <span className="font-bold text-white">{brand.foundedYear}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Giấy phép:</span>
                <span className="font-bold text-emerald-400 text-right">{brand.license}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Tốc độ rút tiền:</span>
                <span className="font-bold text-emerald-400">{brand.withdrawalSpeed}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Nạp tối thiểu:</span>
                <span className="font-bold text-white">{brand.minDeposit}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Đánh giá chung:</span>
                <span className="font-bold text-amber-400">{brand.rating.toFixed(1)} / 5.0 ⭐</span>
              </div>
            </div>

            <a
              href={`/go/${brand.slug}`}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl text-center font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition"
            >
              <span>VÀO CƯỢC NGAY</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Top Alternative Brands */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Gợi Ý Nhà Cái Uy Tín Khác
            </h3>
            <div className="space-y-3">
              {alternativeBrands.map((altBrand, idx) => (
                <div
                  key={altBrand.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-400/40 transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 p-0.5 flex items-center justify-center flex-shrink-0">
                      {altBrand.logo ? (
                        <img
                          src={altBrand.logo}
                          alt={altBrand.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-xs font-bold text-amber-400">{altBrand.name.slice(0, 2)}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/review/${altBrand.slug}`}
                        className="text-xs font-bold text-white hover:text-amber-400 transition block truncate"
                      >
                        {altBrand.name}
                      </Link>
                      <span className="text-[10px] text-emerald-400 truncate block">
                        {altBrand.withdrawalSpeed}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`/go/${altBrand.slug}`}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition flex-shrink-0"
                  >
                    Cược
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA for high conversion */}
      <StickyMobileCTA brand={brand} />
    </div>
  );
}
