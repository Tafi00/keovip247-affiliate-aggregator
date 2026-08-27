import React from 'react';
import Link from 'next/link';
import { Trophy, ShieldAlert, HeartHandshake, Phone, Send, Mail, Lock } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm mt-20">
      {/* 18+ Responsible Gambling Banner */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full border-2 border-red-500 text-red-500 font-black text-sm flex items-center justify-center flex-shrink-0 bg-red-500/10">
              18+
            </span>
            <div>
              <h4 className="font-bold text-white text-sm">Chơi có trách nhiệm (Responsible Gambling)</h4>
              <p className="text-xs text-slate-400 max-w-xl">
                Cá cược chỉ dành cho người từ đủ 18 tuổi trở lên. Hãy xem cá cược như một hình thức giải trí và kiểm soát tài chính bản thân.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              100% Giấy Phép
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              Minh Bạch & Độc Lập
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: About */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-black text-white">
                KEO<span className="text-amber-400">VIP</span>
                <span className="text-red-500 ml-1">24/7</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              {settings?.siteDescription ||
                'KEOVIP247 là chuyên trang đánh giá, phân tích và xếp hạng nhà cái, cổng game bài uy tín số 1 Việt Nam. Chúng tôi cam kết cung cấp thông tin trung thực, khách quan và cập nhật link vào mới nhất không bị chặn.'}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={settings?.telegram || 'https://t.me/keovip247_support'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1.5 rounded-lg hover:bg-sky-500/20 transition"
              >
                <Send className="w-3.5 h-3.5" />
                Telegram Support
              </a>
              <a
                href={`tel:${settings?.hotline || '0988888247'}`}
                className="flex items-center gap-1.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg hover:bg-emerald-500/20 transition"
              >
                <Phone className="w-3.5 h-3.5" />
                Hotline 24/7
              </a>
              <a
                href={`mailto:${settings?.email || 'contact@keovip247.com'}`}
                className="flex items-center gap-1.5 text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition"
              >
                <Mail className="w-3.5 h-3.5" />
                Email Liên Hệ
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Chuyên Mục</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/top-nha-cai" className="hover:text-amber-400 transition">
                  Top Nhà Cái Uy Tín
                </Link>
              </li>
              <li>
                <Link href="/cong-game" className="hover:text-amber-400 transition">
                  Cổng Game Đổi Thưởng
                </Link>
              </li>
              <li>
                <Link href="/khuyen-mai" className="hover:text-amber-400 transition">
                  Khuyến Mãi Tân Thủ
                </Link>
              </li>
              <li>
                <Link href="/soi-keo" className="hover:text-amber-400 transition">
                  Kinh Nghiệm Soi Kèo
                </Link>
              </li>
              <li>
                <Link href="/huong-dan" className="hover:text-amber-400 transition">
                  Hướng Dẫn Nạp Rút
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Top Brands */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Thương Hiệu Nổi Bật</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/go/bk8" className="hover:text-amber-400 transition flex items-center justify-between">
                  <span>Nhà cái BK8</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Tặng 200%</span>
                </Link>
              </li>
              <li>
                <Link href="/go/w88" className="hover:text-amber-400 transition flex items-center justify-between">
                  <span>Nhà cái W88</span>
                  <span className="text-[10px] text-amber-400 font-bold">10 Năm Uy Tín</span>
                </Link>
              </li>
              <li>
                <Link href="/go/fun88" className="hover:text-amber-400 transition flex items-center justify-between">
                  <span>Nhà cái FUN88</span>
                  <span className="text-[10px] text-emerald-400 font-bold">6 Triệu VNĐ</span>
                </Link>
              </li>
              <li>
                <Link href="/go/sunwin" className="hover:text-amber-400 transition flex items-center justify-between">
                  <span>Cổng game Sunwin</span>
                  <span className="text-[10px] text-amber-400 font-bold">Tài Xỉu MD5</span>
                </Link>
              </li>
              <li>
                <Link href="/go/go88" className="hover:text-amber-400 transition flex items-center justify-between">
                  <span>Cổng game GO88</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Code 50K</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & CMS */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Về Chúng Tôi</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/bai-viet/top-10-nha-cai-uy-tin-nhat-viet-nam" className="hover:text-amber-400 transition">
                  Tiêu chí đánh giá
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Chính sách bảo mật</span>
              </li>
              <li>
                <span className="text-slate-500">Điều khoản sử dụng</span>
              </li>
              <li>
                <span className="text-slate-500">Miễn trừ trách nhiệm</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-amber-400 border border-slate-800 px-2 py-1 rounded bg-slate-900 transition"
                >
                  <Lock className="w-3 h-3" />
                  Admin CMS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-500 space-y-2">
          <p>{settings?.footerDisclaimer || 'Bản quyền © 2026 KEOVIP247. Mọi thông tin trên trang chỉ mang tính chất tham khảo.'}</p>
          <p className="text-[11px] text-slate-600">
            Design & Engine Powered by Next.js 15 App Router • SEO Optimized Aggregator
          </p>
        </div>
      </div>
    </footer>
  );
}
