'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, Zap, ExternalLink, ArrowRight, Clock } from 'lucide-react';
import { Brand } from '@/lib/types';
import { cn } from '@/lib/utils';

interface BrandRankingTableProps {
  brands: Brand[];
}

export default function BrandRankingTable({ brands }: BrandRankingTableProps) {
  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl">
      <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Bảng Xếp Hạng & So Sánh Chi Tiết Top 10 Nhà Cái
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Được cập nhật tự động & thẩm định độc lập theo chuẩn quốc tế 2026.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-slate-300">
          <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800">
            <tr>
              <th className="py-4 px-4 text-center w-14">Hạng</th>
              <th className="py-4 px-4 min-w-[200px]">Thương Hiệu</th>
              <th className="py-4 px-4 hidden md:table-cell min-w-[150px]">Giấy Phép</th>
              <th className="py-4 px-4 min-w-[120px]">Tốc Độ Rút</th>
              <th className="py-4 px-4 min-w-[130px]">Nạp Tối Thiểu</th>
              <th className="py-4 px-4 hidden lg:table-cell min-w-[220px]">Khuyến Mãi Hot</th>
              <th className="py-4 px-4 text-center min-w-[140px]">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {brands.map((brand, index) => {
              const rank = index + 1;
              const isTop3 = rank <= 3;

              return (
                <tr
                  key={brand.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Rank */}
                  <td className="py-4 px-4 text-center">
                    <span
                      className={cn(
                        'inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-black',
                        rank === 1
                          ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                          : rank === 2
                          ? 'bg-slate-300 text-slate-950 font-bold'
                          : rank === 3
                          ? 'bg-amber-700 text-white font-bold'
                          : 'text-slate-400 bg-slate-800/60'
                      )}
                    >
                      {rank}
                    </span>
                  </td>

                  {/* Brand info */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 p-0.5 flex items-center justify-center flex-shrink-0 overflow-hidden">
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
                      <div>
                        <Link
                          href={`/review/${brand.slug}`}
                          className="font-bold text-white hover:text-amber-400 transition flex items-center gap-1"
                        >
                          {brand.name}
                        </Link>
                        <div className="flex items-center gap-1 text-[11px] text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{brand.rating.toFixed(1)}/5.0</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* License */}
                  <td className="py-4 px-4 hidden md:table-cell text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="truncate max-w-[140px]">{brand.license}</span>
                    </div>
                  </td>

                  {/* Withdrawal speed */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                      <Clock className="w-3 h-3" />
                      {brand.withdrawalSpeed}
                    </span>
                  </td>

                  {/* Min deposit */}
                  <td className="py-4 px-4 text-xs font-semibold text-slate-300">
                    {brand.minDeposit}
                  </td>

                  {/* Bonus */}
                  <td className="py-4 px-4 hidden lg:table-cell text-xs text-amber-300 font-semibold">
                    <span className="line-clamp-2">{brand.bonus}</span>
                  </td>

                  {/* Action CTA */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-col gap-1.5 items-center justify-center">
                      <a
                        href={`/go/${brand.slug}`}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className={cn(
                          'w-full max-w-[110px] py-1.5 px-3 rounded-lg text-xs font-extrabold text-slate-950 transition transform active:scale-95 flex items-center justify-center gap-1',
                          isTop3
                            ? 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-sm'
                            : 'bg-emerald-400 hover:bg-emerald-300'
                        )}
                      >
                        <span>CƯỢC</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <Link
                        href={`/review/${brand.slug}`}
                        className="text-[11px] text-slate-400 hover:text-white transition underline"
                      >
                        Đọc review
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
