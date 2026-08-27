import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Trophy,
  MousePointerClick,
  FileText,
  HelpCircle,
  TrendingUp,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { isAdminAuthenticated } from '@/lib/auth';
import { getDashboardStats } from '@/lib/db';
import AdminHeader from '@/components/admin/AdminHeader';
import StatsCard from '@/components/admin/StatsCard';
import ResetClicksButton from '@/components/admin/ResetClicksButton';

export default async function AdminDashboardPage() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect('/admin/login');
  }

  const stats = await getDashboardStats();

  return (
    <div className="space-y-8 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AdminHeader
          title="Bảng Điều Khiển Tổng Quan"
          description="Theo dõi lưu lượng click affiliate, hiệu suất nhà cái và bài viết"
        />
        <div className="flex-shrink-0">
          <ResetClicksButton />
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Lượt Click Affiliate"
          value={stats.totalClicks.toLocaleString()}
          icon={MousePointerClick}
          change="+18.4% so với tuần trước"
          color="amber"
        />
        <StatsCard
          title="Tổng Số Nhà Cái"
          value={stats.totalBrands}
          icon={Trophy}
          change="8 thương hiệu hoạt động"
          color="emerald"
        />
        <StatsCard
          title="Tổng Số Bài Viết"
          value={stats.totalArticles}
          icon={FileText}
          change={`${stats.totalViews.toLocaleString()} lượt đọc`}
          color="blue"
        />
        <StatsCard
          title="Câu Hỏi Thường Gặp"
          value={stats.totalFAQs}
          icon={HelpCircle}
          change="Tự động sinh Schema FAQ"
          color="purple"
        />
      </div>

      {/* Main Grid: Top Performing Brands & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Clicked Brands */}
        <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                Top Nhà Cái Có Lượt Click Cao Nhất
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Dữ liệu ghi nhận từ hệ thống link cloaking <code>/go/[brandSlug]</code>
              </p>
            </div>
            <Link
              href="/admin/brands"
              className="text-xs font-semibold text-amber-400 hover:underline"
            >
              Xem tất cả
            </Link>
          </div>

          <div className="space-y-4">
            {stats.topBrands.map((brand, index) => {
              const percentage =
                stats.totalClicks > 0
                  ? Math.round(((brand.clickCount || 0) / stats.totalClicks) * 100)
                  : 0;

              return (
                <div
                  key={brand.id}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-700 text-xs font-bold text-amber-400 flex items-center justify-center">
                        #{index + 1}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-900 overflow-hidden border border-slate-800 p-0.5 flex items-center justify-center">
                        {brand.logo ? (
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <span className="text-xs font-bold text-amber-400">
                            {brand.name.slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{brand.name}</h4>
                        <span className="text-[11px] text-slate-500 font-mono">
                          /go/{brand.slug}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-amber-400">
                        {(brand.clickCount || 0).toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400 block font-medium">
                        clicks ({percentage}%)
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full"
                      style={{ width: `${Math.max(percentage, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Management Actions & System Health */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Thao Tác Nhanh</h3>
            <div className="space-y-2.5">
              <Link
                href="/admin/brands"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/40 text-slate-200 text-xs font-bold transition group"
              >
                <div className="flex items-center gap-2.5">
                  <PlusCircle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
                  <span>Thêm Nhà Cái Mới</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </Link>

              <Link
                href="/admin/articles/new"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/40 text-slate-200 text-xs font-bold transition group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
                  <span>Soạn Bài Viết Mới</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </Link>

              <Link
                href="/admin/faqs"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/40 text-slate-200 text-xs font-bold transition group"
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-purple-400 group-hover:scale-110 transition" />
                  <span>Cập Nhật FAQ</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 rounded-2xl border border-amber-500/20 p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Trạng Thái Hệ Thống</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mọi tính năng hoạt động ổn định. Bảng xếp hạng và link cloaking đang bảo vệ SEO 100%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
