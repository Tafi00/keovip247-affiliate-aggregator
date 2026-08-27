'use client';

import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface AnnouncementBarProps {
  text?: string;
}

export default function AnnouncementBar({
  text = '🔥 Chào mừng tân thủ: Nhận ngay 199K cược thử miễn phí khi đăng ký qua KEOVIP247 hôm nay!',
}: AnnouncementBarProps) {
  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 text-xs sm:text-sm font-semibold py-2 px-4 shadow-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 truncate">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
          </span>
          <Flame className="w-4 h-4 text-slate-950 flex-shrink-0 animate-bounce" />
          <span className="truncate">{text}</span>
        </div>
        <Link
          href="/khuyen-mai"
          className="hidden md:flex items-center gap-1 bg-slate-950 text-amber-400 hover:bg-slate-900 text-xs px-3 py-1 rounded-full font-bold transition flex-shrink-0 shadow"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Săn Khuyến Mãi
        </Link>
      </div>
    </div>
  );
}
