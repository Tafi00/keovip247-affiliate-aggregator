import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  isPositive?: boolean;
  color?: 'amber' | 'emerald' | 'blue' | 'purple';
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  isPositive = true,
  color = 'amber',
}: StatsCardProps) {
  const colorMap = {
    amber: 'from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30',
    emerald: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    blue: 'from-blue-500/20 to-sky-500/10 text-blue-400 border-blue-500/30',
    purple: 'from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={cn('p-2.5 rounded-xl border bg-gradient-to-br', colorMap[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-3">
        <div className="text-2xl sm:text-3xl font-black text-white">{value}</div>
        {change && (
          <p
            className={cn(
              'text-xs font-semibold mt-1 flex items-center gap-1',
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            <span>{change}</span>
          </p>
        )}
      </div>
    </div>
  );
}
