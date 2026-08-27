'use client';

import React from 'react';
import { Zap, ExternalLink } from 'lucide-react';
import { Brand } from '@/lib/types';

interface StickyMobileCTAProps {
  brand: Brand;
}

export default function StickyMobileCTA({ brand }: StickyMobileCTAProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-amber-500/40 p-3 shadow-2xl animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 p-0.5 flex items-center justify-center flex-shrink-0">
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-xs font-black text-amber-400">
                {brand.name.slice(0, 3)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-white text-sm truncate">{brand.name}</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-1.5 rounded">
                Uy Tín
              </span>
            </div>
            <p className="text-[11px] text-amber-400 truncate font-semibold">
              {brand.badge || brand.bonus}
            </p>
          </div>
        </div>

        <a
          href={`/go/${brand.slug}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="py-2.5 px-4 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 shadow-lg shadow-amber-500/30 flex items-center gap-1.5 flex-shrink-0 animate-pulse"
        >
          <Zap className="w-3.5 h-3.5 fill-slate-950" />
          <span>CƯỢC NGAY</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
