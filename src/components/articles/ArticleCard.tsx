import React from 'react';
import Link from 'next/link';
import { Calendar, Eye, ArrowRight, User } from 'lucide-react';
import { Article } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  'top-nha-cai': { label: 'Top Nhà Cái', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  'cong-game': { label: 'Cổng Game', color: 'bg-purple-500/15 text-purple-300 border-purple-500/30' },
  'khuyen-mai': { label: 'Khuyến Mãi', color: 'bg-red-500/15 text-red-300 border-red-500/30' },
  'soi-keo': { label: 'Soi Kèo', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  'huong-dan': { label: 'Hướng Dẫn', color: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const cat = CATEGORY_LABELS[article.category] || {
    label: 'Bài Viết',
    color: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  const articleHref = `/bai-viet/${article.slug}`;

  return (
    <article className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800/80 overflow-hidden hover:border-amber-400/40 transition-all duration-300 flex flex-col group card-glow">
      {/* Thumbnail */}
      <Link href={articleHref} className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={article.thumbnail || 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${cat.color}`}
          >
            {cat.label}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Metadata */}
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {formatDate(article.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              {(article.views || 0).toLocaleString()} xem
            </span>
          </div>

          {/* Title */}
          <Link href={articleHref}>
            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
          </Link>

          {/* Summary */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Read more button */}
        <div className="pt-4 mt-2 border-t border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span className="truncate max-w-[120px]">{article.author || 'Kèo VIP'}</span>
          </div>
          <Link
            href={articleHref}
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform"
          >
            Đọc bài <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
