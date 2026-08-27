'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Trophy,
  Gamepad2,
  Gift,
  TrendingUp,
  BookOpen,
  Menu,
  X,
  Search,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SiteSettings } from '@/lib/types';
import Image from 'next/image';

const NAV_ITEMS = [
  { href: '/', label: 'Trang Chủ', icon: Trophy },
  { href: '/top-nha-cai', label: 'Top Nhà Cái', icon: ShieldCheck },
  { href: '/cong-game', label: 'Cổng Game Bài', icon: Gamepad2 },
  { href: '/khuyen-mai', label: 'Khuyến Mãi', icon: Gift },
  { href: '/soi-keo', label: 'Soi Kèo', icon: TrendingUp },
  { href: '/huong-dan', label: 'Hướng Dẫn', icon: BookOpen },
];

interface HeaderProps {
  settings?: SiteSettings;
}

export default function Header({ settings }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const hasCustomLogo = settings?.logo && settings.logo !== '/images/logo.png' && settings.logo.startsWith('http');

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              {hasCustomLogo ? (
                <div className="relative h-10 w-auto min-w-[120px]">
                  <img
                    src={settings.logo}
                    alt={settings?.siteName || 'Logo'}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
                    <Trophy className="w-6 h-6 text-slate-950" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                        {settings?.siteName ? (
                          settings.siteName
                        ) : (
                          <>
                            KEO<span className="text-amber-400">VIP</span>
                          </>
                        )}
                      </span>
                      <span className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow">
                        24/7
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 tracking-wider uppercase hidden sm:block font-medium">
                      Review & Xếp Hạng Nhà Cái
                    </span>
                  </div>
                </>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition duration-200',
                      isActive
                        ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    )}
                  >
                    <Icon className={cn('w-4 h-4', isActive ? 'text-amber-400' : 'text-slate-400')} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition"
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* VIP CTA */}
              <Link
                href="/top-nha-cai"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transition transform active:scale-95"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Top Uy Tín 2026</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold transition',
                    isActive
                      ? 'bg-amber-400/15 text-amber-400 font-bold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  )}
                >
                  <Icon className={cn('w-5 h-5', isActive ? 'text-amber-400' : 'text-slate-400')} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/top-nha-cai"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 shadow-md text-center"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                Xem Bảng Xếp Hạng Top 10
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-amber-400" />
              Tìm Kiếm Nhà Cái & Bài Viết
            </h3>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nhập tên nhà cái (BK8, Sunwin, W88...) hoặc từ khóa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  className="px-4 py-2 text-sm rounded-lg text-slate-400 hover:text-white"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
