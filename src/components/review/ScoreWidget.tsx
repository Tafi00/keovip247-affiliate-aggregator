'use client';

import React from 'react';
import { Star, ShieldCheck, Zap, Award, ExternalLink } from 'lucide-react';
import { Brand } from '@/lib/types';

interface ScoreWidgetProps {
  brand: Brand;
}

export default function ScoreWidget({ brand }: ScoreWidgetProps) {
  const metrics = [
    { label: 'Độ uy tín & Pháp lý giấy phép', score: 98, text: '9.8 / 10' },
    { label: 'Tốc độ thanh toán & Nạp rút', score: 99, text: '9.9 / 10' },
    { label: 'Sảnh cược & Đa dạng trò chơi', score: 96, text: '9.6 / 10' },
    { label: 'Khuyến mãi tân thủ & Hoàn trả', score: 97, text: '9.7 / 10' },
    { label: 'Hỗ trợ khách hàng 24/7', score: 98, text: '9.8 / 10' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-2xl border border-amber-500/30 p-6 shadow-2xl my-8 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
        {/* Left: Brand info */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 p-1 flex items-center justify-center flex-shrink-0 shadow-inner">
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-2xl font-black text-amber-400">
                {brand.name.slice(0, 3)}
              </span>
            )}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-1 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Đã Thẩm Định An Toàn 2026
            </div>
            <h3 className="text-2xl font-black text-white">{brand.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Giấy phép: {brand.license}</p>
          </div>
        </div>

        {/* Right: Overall Score Badge */}
        <div className="flex items-center gap-3 bg-slate-950/80 px-6 py-4 rounded-2xl border border-slate-800">
          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
              {brand.rating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500 font-bold block">/ 5.0</span>
          </div>
          <div className="space-y-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-emerald-400 block">XUẤT SẮC</span>
          </div>
        </div>
      </div>

      {/* Breakdown Scores */}
      <div className="py-6 space-y-3.5">
        {metrics.map((m, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">{m.label}</span>
              <span className="text-amber-400 font-bold">{m.text}</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${m.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <span className="text-xs text-slate-400 block font-medium">Khuyến mãi đang áp dụng:</span>
          <span className="text-sm font-bold text-amber-300">{brand.bonus}</span>
        </div>

        <a
          href={`/go/${brand.slug}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-xl shadow-amber-500/25 transition transform active:scale-95 flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Award className="w-4 h-4" />
          <span>CƯỢC NGAY TẠI {brand.name}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
