'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Loader2,
  Check,
  Globe,
  Phone,
  Send,
  Mail,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.settings) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSuccessMsg('Đã lưu cấu hình website thành công!');
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        alert('Không thể lưu cài đặt');
      }
    } catch {
      alert('Lỗi kết nối máy chủ');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-3 text-amber-400">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="text-xs font-semibold">Đang tải cài đặt website...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 sm:p-8 max-w-4xl mx-auto">
      <AdminHeader
        title="Cài Đặt Website & Thông Tin Chung"
        description="Quản lý hotline, telegram, banner thông báo, SEO defaults và bản quyền chân trang"
      />

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Basic Site Info */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-400" />
            Thông Tin Thương Hiệu & SEO
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Tên Website</label>
              <input
                type="text"
                value={settings.siteName || ''}
                onChange={(e) => handleChange('siteName', e.target.value)}
                placeholder="KEOVIP247"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Tiêu Đề Trang Chủ (Title Tag)</label>
              <input
                type="text"
                value={settings.siteTitle || ''}
                onChange={(e) => handleChange('siteTitle', e.target.value)}
                placeholder="KEOVIP247 - Top 10 Nhà Cái Uy Tín Nhất 2026"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Mô Tả Trang Chủ (Meta Description)</label>
            <textarea
              rows={2}
              value={settings.siteDescription || ''}
              onChange={(e) => handleChange('siteDescription', e.target.value)}
              placeholder="Chuyên trang đánh giá & xếp hạng nhà cái, cổng game bài uy tín số 1 Việt Nam..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* 2. Hero & Announcement Header */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Nội Dung Hero Banner & Thông Báo Đầu Trang
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Thông Báo Chạy Đầu Trang (Announcement Bar)</label>
            <input
              type="text"
              value={settings.announcementBar || ''}
              onChange={(e) => handleChange('announcementBar', e.target.value)}
              placeholder="🔥 Chào mừng tân thủ: Nhận ngay 199K cược thử miễn phí..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Tiêu Đề Lớn Hero (H1)</label>
              <input
                type="text"
                value={settings.heroTitle || ''}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                placeholder="TOP 10 NHÀ CÁI UY TÍN NHẤT VIỆT NAM 2026"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Mô Tả Phụ Hero</label>
              <input
                type="text"
                value={settings.heroSubtitle || ''}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                placeholder="Kiểm định độc lập hơn 50+ nhà cái & cổng game..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* 3. Contact & Socials */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            Kênh Liên Hệ & Hỗ Trợ Khách Hàng
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Phone className="w-3 h-3 text-emerald-400" />
                Hotline
              </label>
              <input
                type="text"
                value={settings.hotline || ''}
                onChange={(e) => handleChange('hotline', e.target.value)}
                placeholder="0988.888.247"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Send className="w-3 h-3 text-sky-400" />
                Telegram Support
              </label>
              <input
                type="text"
                value={settings.telegram || ''}
                onChange={(e) => handleChange('telegram', e.target.value)}
                placeholder="https://t.me/keovip247"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Mail className="w-3 h-3 text-amber-400" />
                Email
              </label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="contact@keovip247.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* 4. Footer Disclaimer */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            Cảnh Báo 18+ & Miễn Trừ Trách Nhiệm Chân Trang
          </h3>

          <div className="space-y-1">
            <textarea
              rows={3}
              value={settings.footerDisclaimer || ''}
              onChange={(e) => handleChange('footerDisclaimer', e.target.value)}
              placeholder="Cảnh báo trách nhiệm: Các trò chơi cá cược trực tuyến chỉ dành cho người từ đủ 18 tuổi trở lên..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-500/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang lưu...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Lưu Cài Đặt Website</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
