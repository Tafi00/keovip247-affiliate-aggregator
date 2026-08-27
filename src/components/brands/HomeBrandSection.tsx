'use client';

import React, { useState, useMemo } from 'react';
import BrandCard from './BrandCard';
import BrandFilter, { FilterType } from './BrandFilter';
import { Brand } from '@/lib/types';
import { Search, Trophy, ShieldAlert } from 'lucide-react';

interface HomeBrandSectionProps {
  initialBrands: Brand[];
}

export default function HomeBrandSection({ initialBrands }: HomeBrandSectionProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const counts = useMemo(() => {
    return {
      all: initialBrands.length,
      nhaCai: initialBrands.filter((b) => b.category === 'nha-cai').length,
      congGame: initialBrands.filter((b) => b.category === 'cong-game').length,
    };
  }, [initialBrands]);

  const filteredBrands = useMemo(() => {
    return initialBrands.filter((brand) => {
      // Category filter
      if (filter === 'nha-cai' && brand.category !== 'nha-cai') return false;
      if (filter === 'cong-game' && brand.category !== 'cong-game') return false;
      if (filter === 'fast-withdrawal') {
        const speed = brand.withdrawalSpeed.toLowerCase();
        if (!speed.includes('1') && !speed.includes('2') && !speed.includes('3') && !speed.includes('5')) {
          return false;
        }
      }
      if (filter === 'freebet') {
        const text = `${brand.badge} ${brand.bonus}`.toLowerCase();
        if (!text.includes('199k') && !text.includes('100k') && !text.includes('50k') && !text.includes('90k') && !text.includes('thử') && !text.includes('code')) {
          return false;
        }
      }

      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = brand.name.toLowerCase().includes(query);
        const matchBadge = brand.badge.toLowerCase().includes(query);
        const matchLicense = brand.license.toLowerCase().includes(query);
        if (!matchName && !matchBadge && !matchLicense) return false;
      }

      return true;
    });
  }, [initialBrands, filter, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-950/60 p-3 sm:p-4 rounded-2xl border border-slate-800">
        <BrandFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />

        {/* Quick Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Lọc nhanh nhà cái..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Brands List */}
      {filteredBrands.length > 0 ? (
        <div className="space-y-4">
          {filteredBrands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} rank={index + 1} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <ShieldAlert className="w-10 h-10 text-amber-400 mx-auto" />
          <h4 className="text-base font-bold text-white">Không tìm thấy nhà cái phù hợp</h4>
          <p className="text-xs text-slate-400">
            Vui lòng thử tìm với từ khóa khác hoặc chọn tab &ldquo;Tất Cả&rdquo;.
          </p>
          <button
            onClick={() => {
              setFilter('all');
              setSearchTerm('');
            }}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition"
          >
            Xem tất cả nhà cái
          </button>
        </div>
      )}
    </div>
  );
}
