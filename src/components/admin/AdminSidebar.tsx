'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Trophy,
  FileText,
  HelpCircle,
  Settings,
  ExternalLink,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Tổng Quan', icon: LayoutDashboard, exact: true },
  { href: '/admin/brands', label: 'Quản Lý Nhà Cái', icon: Trophy },
  { href: '/admin/articles', label: 'Quản Lý Bài Viết', icon: FileText },
  { href: '/admin/faqs', label: 'Quản Lý FAQ', icon: HelpCircle },
  { href: '/admin/settings', label: 'Cài Đặt Website', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0">
      {/* Brand & Nav */}
      <div className="p-5 space-y-6">
        <div className="flex items-center gap-2 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h2 className="text-base font-black text-white">KEOVIP ADMIN</h2>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              Control Panel v2.0
            </span>
          </div>
        </div>

        <nav className="space-y-1">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition',
                  isActive
                    ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-amber-400' : 'text-slate-500')} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-5 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition"
        >
          <span>Xem Trang Chủ</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng Xuất</span>
        </button>
      </div>
    </aside>
  );
}
