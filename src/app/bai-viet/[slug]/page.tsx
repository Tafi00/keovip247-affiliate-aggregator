import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Calendar,
  Eye,
  User,
  BookOpen,
  Share2,
  Trophy,
  ExternalLink,
} from 'lucide-react';
import { getArticles, getArticleBySlug, getBrands, incrementArticleViews } from '@/lib/db';
import { extractTOC, formatDate } from '@/lib/utils';
import TableOfContents from '@/components/review/TableOfContents';
import MarkdownRenderer from '@/components/articles/MarkdownRenderer';
import ArticleCard from '@/components/articles/ArticleCard';
import StickyMobileCTA from '@/components/review/StickyMobileCTA';

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Không Tìm Thấy Bài Viết' };
  }

  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.summary,
    keywords: article.seo?.keywords,
    openGraph: {
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.summary,
      images: [article.thumbnail],
    },
  };
}

export default async function ArticleDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Increment views
  try {
    await incrementArticleViews(article.slug);
  } catch (err) {
    console.error('Failed to log article view:', err);
  }

  const toc = extractTOC(article.content);

  // Fetch all articles for related recommendations
  const allArticles = await getArticles();
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category && a.status !== 'draft')
    .slice(0, 3);

  // Fetch brands for sidebar
  const allBrands = await getBrands();
  const topBrands = allBrands.filter((b) => b.status !== 'inactive').slice(0, 3);
  const featuredBrand = topBrands[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-amber-400 transition">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/${article.category}`} className="hover:text-amber-400 transition capitalize">
          {article.category.replace(/-/g, ' ')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-amber-400 font-semibold truncate max-w-xs">{article.title}</span>
      </nav>

      {/* Article Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          {article.category.replace(/-/g, ' ')}
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span className="flex items-center gap-1 text-slate-300 font-medium">
            <User className="w-3.5 h-3.5 text-amber-400" />
            {article.author || 'Kèo VIP'}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {formatDate(article.createdAt)}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            {(article.views || 0).toLocaleString()} lượt đọc
          </span>
        </div>
      </div>

      {/* Featured Thumbnail */}
      {article.thumbnail && (
        <div className="relative aspect-video max-h-[460px] w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-950">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Layout: Main Article & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Box */}
          {article.summary && (
            <div className="bg-amber-500/5 border-l-4 border-amber-400 p-4 sm:p-5 rounded-r-2xl text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              <strong>Tóm tắt:</strong> {article.summary}
            </div>
          )}

          {/* Table of Contents */}
          <TableOfContents items={toc} />

          {/* Article Markdown Body */}
          <div className="bg-slate-900/40 rounded-3xl border border-slate-800/80 p-6 sm:p-10">
            <MarkdownRenderer content={article.content} />
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          {/* Top Brand CTA Card */}
          {featuredBrand && (
            <div className="bg-slate-900/90 rounded-2xl border border-amber-500/30 p-5 space-y-4 shadow-xl sticky top-24">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Trophy className="w-4 h-4" />
                Nhà Cái Được Khuyên Dùng #1
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-800 p-1 flex items-center justify-center flex-shrink-0">
                  {featuredBrand.logo ? (
                    <img
                      src={featuredBrand.logo}
                      alt={featuredBrand.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-sm font-black text-amber-400">{featuredBrand.name}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-base">{featuredBrand.name}</h4>
                  <p className="text-[11px] text-emerald-400 font-semibold">{featuredBrand.badge}</p>
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Rút tiền:</span>
                  <span className="text-emerald-400 font-bold">{featuredBrand.withdrawalSpeed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ưu đãi:</span>
                  <span className="text-amber-400 font-bold">199K Tân Thủ</span>
                </div>
              </div>

              <a
                href={`/go/${featuredBrand.slug}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-full py-3 rounded-xl text-center font-black text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 transition"
              >
                <span>CƯỢC NGAY TẠI {featuredBrand.name}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Top 3 Alternative Brands */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              Top Nhà Cái Uy Tín Khác
            </h4>
            <div className="space-y-2.5">
              {topBrands.slice(1, 3).map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-xs font-bold text-amber-400 flex-shrink-0">
                      {brand.name.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">{brand.name}</h5>
                      <span className="text-[10px] text-emerald-400 block truncate">
                        {brand.withdrawalSpeed}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`/go/${brand.slug}`}
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

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-slate-800">
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            Bài Viết Cùng Chuyên Mục
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <ArticleCard key={rel.id} article={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile CTA for high conversion */}
      {featuredBrand && <StickyMobileCTA brand={featuredBrand} />}
    </div>
  );
}
