'use client';

import React from 'react';
import { Trophy, Gamepad2, Zap, Gift, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FilterType = 'all' | 'nha-cai' | 'cong-game' | 'fast-withdrawal' | 'freebet';

interface BrandFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    nhaCai: number;
    congGame: number;
  };
}

export default function BrandFilter({
  currentFilter,
  onFilterChange,
  counts,
}: BrandFilterProps) {
  const tabs = [
    { id: 'all' as FilterType, label: 'Tất Cả', icon: Trophy, count: counts.all },
    { id: 'nha-cai' as FilterType, label: 'Top Nhà Cái', icon: ShieldCheck, count: counts.nhaCai },
    { id: 'cong-game' as FilterType, label: 'Cổng Game Bài', icon: Gamepad2, count: counts.congGame },
    { id: 'fast-withdrawal' as FilterType, label: 'Rút Tiền Siêu Tốc', icon: Zap },
    { id: 'freebet' as FilterType, label: 'Tặng Tiền Tân Thủ', icon: Gift },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentFilter === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0',
              isActive
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800/80'
            )}
          >
            <Icon className={cn('w-4 h-4', isActive ? 'text-slate-950' : 'text-amber-400')} />
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'text-[11px] px-1.5 py-0.2 rounded-full font-extrabold',
                  isActive
                    ? 'bg-slate-950 text-amber-400'
                    : 'bg-slate-800 text-slate-400'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
