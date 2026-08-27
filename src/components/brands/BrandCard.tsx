'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  ShieldCheck,
  Zap,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Brand } from '@/lib/types';
import { cn } from '@/lib/utils';

interface BrandCardProps {
  brand: Brand;
  rank: number;
}

export default function BrandCard({ brand, rank }: BrandCardProps) {
  // Rank badge styling
  const isTop1 = rank === 1;
  const isTop2 = rank === 2;
  const isTop3 = rank === 3;

  const rankBadgeColor = isTop1
    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-lg shadow-amber-500/30'
    : isTop2
    ? 'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-black shadow-md'
    : isTop3
    ? 'bg-gradient-to-r from-amber-700 to-amber-600 text-white font-bold shadow-md'
    : 'bg-slate-800 text-slate-300 font-semibold border border-slate-700';

  const reviewLink = brand.reviewSlug ? `/review/${brand.slug}` : `/review/${brand.slug}`;

  return (
    <div
      className={cn(
        'relative bg-slate-900/90 backdrop-blur-md rounded-2xl border transition-all duration-300 p-5 sm:p-6 card-glow',
        isTop1
          ? 'border-amber-400/50 shadow-xl shadow-amber-500/10'
          : 'border-slate-800/80 hover:border-slate-700'
      )}
    >
      {/* Top Banner Ribbon for TOP 1 */}
      {isTop1 && (
        <div className="absolute -top-3 left-6 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 fill-white" />
          Nhà Cái Uy Tín Số 1 Việt Nam 2026
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Section: Rank, Logo & Brand Details */}
        <div className="flex items-start sm:items-center gap-4 sm:gap-5 w-full lg:w-auto">
          {/* Rank Badge */}
          <div
            className={cn(
              'w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0',
              rankBadgeColor
            )}
          >
            #{rank}
          </div>

          {/* Brand Logo */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-950 border border-slate-800 p-1 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-inner">
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  // Fallback to text initials if image fails
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `<span class="text-xl font-black text-amber-400">${brand.name.slice(0, 3)}</span>`;
                  }
                }}
              />
            ) : (
              <span className="text-xl font-black text-amber-400">{brand.name.slice(0, 3)}</span>
            )}
          </div>

          {/* Brand Info */}
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-black text-white tracking-tight">{brand.name}</h3>
              {brand.badge && (
                <span className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {brand.badge}
                </span>
              )}
            </div>

            {/* Rating and Years */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{brand.rating.toFixed(1)}/5.0</span>
              </div>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span>Thành lập: {brand.foundedYear}</span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="text-slate-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {brand.license}
              </span>
            </div>

            {/* Withdrawal Speed */}
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Tốc độ rút tiền: {brand.withdrawalSpeed}</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Highlights / Pros */}
        <div className="w-full lg:max-w-md bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80">
          <div className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Ưu Điểm Nổi Bật:
          </div>
          <ul className="space-y-1.5">
            {brand.pros.slice(0, 2).map((pro, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: CTA Action Buttons */}
        <div className="flex flex-row sm:flex-col lg:flex-col items-center gap-2.5 w-full lg:w-44 flex-shrink-0">
          {/* Main Affiliate Link Button (via Cloaking Route /go/[slug]) */}
          <a
            href={`/go/${brand.slug}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className={cn(
              'w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-extrabold text-slate-950 transition transform active:scale-95 text-center shadow-lg',
              isTop1
                ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-amber-500/25 pulse-badge'
                : 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 shadow-emerald-500/20'
            )}
          >
            <span>CƯỢC NGAY</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Read Detailed Review Link */}
          <Link
            href={reviewLink}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700/80 transition text-center"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Đọc Review</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
