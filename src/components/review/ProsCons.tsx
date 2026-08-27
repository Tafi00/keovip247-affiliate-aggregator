import React from 'react';
import { CheckCircle2, XCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {/* Pros Box */}
      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 shadow-lg">
        <h4 className="text-base font-bold text-emerald-400 flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-emerald-500/20">
            <ThumbsUp className="w-4 h-4 text-emerald-400" />
          </div>
          Ưu Điểm Nổi Bật (Pros)
        </h4>
        <ul className="space-y-2.5">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons Box */}
      <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 shadow-lg">
        <h4 className="text-base font-bold text-rose-400 flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-rose-500/20">
            <ThumbsDown className="w-4 h-4 text-rose-400" />
          </div>
          Nhược Điểm Cần Khắc Phục (Cons)
        </h4>
        <ul className="space-y-2.5">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
