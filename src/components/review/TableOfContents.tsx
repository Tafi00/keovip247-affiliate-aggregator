'use client';

import React, { useState } from 'react';
import { List, ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import { TOCItem } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-4 sm:p-5 my-6 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
          <List className="w-4 h-4 text-amber-400" />
          <span>Mục Lục Bài Viết</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 font-semibold transition"
        >
          <span>{isOpen ? 'Thu gọn' : 'Mở rộng'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <nav className="mt-4 pt-3 border-t border-slate-800 space-y-1 text-xs sm:text-sm">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={`#${item.id}`}
              className={cn(
                'block py-1 text-slate-300 hover:text-amber-400 transition-colors rounded hover:bg-slate-800/40 px-2',
                item.level === 3 ? 'pl-6 text-slate-400 text-xs' : 'font-medium'
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
