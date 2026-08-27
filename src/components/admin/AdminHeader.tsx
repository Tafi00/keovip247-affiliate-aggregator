import React from 'react';
import { User, Bell, ShieldCheck } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  description?: string;
}

export default function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <header className="bg-slate-900/60 backdrop-blur-md border-b border-slate-800 py-4 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold">Super Admin</span>
        </div>
      </div>
    </header>
  );
}
