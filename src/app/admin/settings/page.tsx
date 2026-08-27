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
  Image as ImageIcon,
  Share2,
  Code2,
  Layers,
  Award,
  Link as LinkIcon,
} from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import AdminHeader from '@/components/admin/AdminHeader';
import ImageUploader from '@/components/admin/ImageUploader';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'media' | 'seo' | 'hero' | 'contact' | 'scripts'>('media');

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
    <div className="space-y-8 p-6 sm:p-8 max-w-5xl mx-auto">
      <AdminHeader
        title="Cài Đặt Website & CMS Tổng Thể"
        description="Quản lý Logo, Favicon, Banner chia sẻ mạng xã hội (OG Image), SEO, Khuyến Mãi, Hotline và Mã nhúng theo dõi"
      />

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-300">
          <Check className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'media'
              ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Logo, Favicon & Banner</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'seo'
              ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>SEO & Metadata</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'hero'
              ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Hero & Khối Uy Tín</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'contact'
              ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Liên Hệ & Mạng Xã Hội</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('scripts')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'scripts'
              ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Mã Nhúng & Tracking</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: MEDIA & BANNERS */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                Logo & Favicon Website
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploader
                  label="Logo Website (Hiển thị trên Header / Footer)"
                  value={settings.logo || ''}
                  onChange={(url) => handleChange('logo', url)}
                  folder="/site-assets"
                />

                <ImageUploader
                  label="Favicon (.ico / .png hiển thị trên tab trình duyệt)"
                  value={settings.favicon || ''}
                  onChange={(url) => handleChange('favicon', url)}
                  folder="/site-assets"
                />
              </div>
            </div>

            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Share2 className="w-4 h-4 text-sky-400" />
                Ảnh Chia Sẻ Mạng Xã Hội (OpenGraph / Facebook / Zalo Share Banner)
              </h3>

              <p className="text-xs text-slate-400">
                Kích thước tối ưu khuyên dùng: <strong>1200 x 630 px</strong>. Ảnh này sẽ tự động hiển thị khi bạn chia sẻ link website lên Facebook, Zalo, Telegram, Twitter.
              </p>

              <ImageUploader
                label="OpenGraph Share Banner"
                value={settings.ogImage || ''}
                onChange={(url) => handleChange('ogImage', url)}
                folder="/site-assets"
              />
            </div>

            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Banner Khuyến Mãi Nổi Bật Trên Trang Chủ (Tùy chọn)
              </h3>

              <ImageUploader
                label="Ảnh Banner Khuyến Mãi (Hiển thị ngay dưới Hero)"
                value={settings.promoBannerUrl || ''}
                onChange={(url) => handleChange('promoBannerUrl', url)}
                folder="/banners"
              />

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Link Đích Khi Click Vào Banner Khuyến Mãi</label>
                <input
                  type="text"
                  value={settings.promoBannerLink || ''}
                  onChange={(e) => handleChange('promoBannerLink', e.target.value)}
                  placeholder="/go/bk8 hoặc https://example.com/aff-link"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SEO & METADATA */}
        {activeTab === 'seo' && (
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              Cấu Hình SEO & Google Search Console
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Tên Thương Hiệu (Site Name)</label>
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
                  placeholder="KEOVIP247 - Top 10 Nhà Cái Uy Tín Nhất Việt Nam 2026"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Mô Tả Trang Chủ (Meta Description)</label>
              <textarea
                rows={3}
                value={settings.siteDescription || ''}
                onChange={(e) => handleChange('siteDescription', e.target.value)}
                placeholder="Chuyên trang đánh giá & xếp hạng nhà cái, cổng game bài uy tín số 1 Việt Nam..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Từ Khóa SEO (Meta Keywords - Phân cách bằng dấu phẩy)</label>
              <input
                type="text"
                value={settings.keywords || ''}
                onChange={(e) => handleChange('keywords', e.target.value)}
                placeholder="top nha cai uy tin, danh gia nha cai, cong game bai doi thuong, keovip247..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                Mã Xác Minh Google Search Console (google-site-verification)
              </label>
              <input
                type="text"
                value={settings.googleVerification || ''}
                onChange={(e) => handleChange('googleVerification', e.target.value)}
                placeholder="ví dụ: google-site-verification-token-xxxx"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />
              <p className="text-[11px] text-slate-500">Chỉ cần dán chuỗi mã xác minh từ Google Search Console (không cần dán thẻ meta).</p>
            </div>
          </div>
        )}

        {/* TAB 3: HERO & TRUST STATS */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Nội Dung Khối Hero & Thông Báo Đầu Trang
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
                  <label className="text-xs font-bold text-slate-300">Badge Nhỏ Trên Đầu Hero</label>
                  <input
                    type="text"
                    value={settings.heroBadge || ''}
                    onChange={(e) => handleChange('heroBadge', e.target.value)}
                    placeholder="Cập Nhật Tháng 8/2026 • Thẩm Định Độc Lập"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

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
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Mô Tả Phụ Hero (Subtitle)</label>
                <input
                  type="text"
                  value={settings.heroSubtitle || ''}
                  onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                  placeholder="Kiểm định độc lập hơn 50+ nhà cái & cổng game..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                4 Khối Thống Kê Uy Tín (Trust Stats)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Stat 1 */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-[11px] font-bold text-amber-400 uppercase">Khối 1 (Giấy Phép)</label>
                  <input
                    type="text"
                    value={settings.stat1Value || ''}
                    onChange={(e) => handleChange('stat1Value', e.target.value)}
                    placeholder="100%"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white font-bold"
                  />
                  <input
                    type="text"
                    value={settings.stat1Label || ''}
                    onChange={(e) => handleChange('stat1Label', e.target.value)}
                    placeholder="Giấy Phép Quốc Tế"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
                  />
                </div>

                {/* Stat 2 */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-[11px] font-bold text-emerald-400 uppercase">Khối 2 (Tốc Độ Rút)</label>
                  <input
                    type="text"
                    value={settings.stat2Value || ''}
                    onChange={(e) => handleChange('stat2Value', e.target.value)}
                    placeholder="< 5 Phút"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white font-bold"
                  />
                  <input
                    type="text"
                    value={settings.stat2Label || ''}
                    onChange={(e) => handleChange('stat2Label', e.target.value)}
                    placeholder="Rút Tiền Siêu Tốc"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
                  />
                </div>

                {/* Stat 3 */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-[11px] font-bold text-rose-400 uppercase">Khối 3 (Khuyến Mãi)</label>
                  <input
                    type="text"
                    value={settings.stat3Value || ''}
                    onChange={(e) => handleChange('stat3Value', e.target.value)}
                    placeholder="199K Free"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white font-bold"
                  />
                  <input
                    type="text"
                    value={settings.stat3Label || ''}
                    onChange={(e) => handleChange('stat3Label', e.target.value)}
                    placeholder="Tặng Thưởng Tân Thủ"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
                  />
                </div>

                {/* Stat 4 */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-[11px] font-bold text-sky-400 uppercase">Khối 4 (Cộng Đồng)</label>
                  <input
                    type="text"
                    value={settings.stat4Value || ''}
                    onChange={(e) => handleChange('stat4Value', e.target.value)}
                    placeholder="50.000+"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white font-bold"
                  />
                  <input
                    type="text"
                    value={settings.stat4Label || ''}
                    onChange={(e) => handleChange('stat4Label', e.target.value)}
                    placeholder="Cược Thủ Tin Chọn"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT & SOCIALS */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                Thông Tin Kênh Liên Hệ Hỗ Trợ 24/7
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                    Telegram
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
                    <Send className="w-3 h-3 text-blue-400" />
                    Zalo
                  </label>
                  <input
                    type="text"
                    value={settings.zalo || ''}
                    onChange={(e) => handleChange('zalo', e.target.value)}
                    placeholder="https://zalo.me/0988888247"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-amber-400" />
                    Email Hỗ Trợ
                  </label>
                  <input
                    type="email"
                    value={settings.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="contact@keovip247.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-blue-500" />
                    Fanpage Facebook
                  </label>
                  <input
                    type="text"
                    value={settings.facebookUrl || ''}
                    onChange={(e) => handleChange('facebookUrl', e.target.value)}
                    placeholder="https://facebook.com/keovip247"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-red-500" />
                    Kênh YouTube
                  </label>
                  <input
                    type="text"
                    value={settings.youtubeUrl || ''}
                    onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                    placeholder="https://youtube.com/@keovip247"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                Cảnh Báo 18+ & Miễn Trừ Trách Nhiệm Chân Trang
              </h3>

              <textarea
                rows={3}
                value={settings.footerDisclaimer || ''}
                onChange={(e) => handleChange('footerDisclaimer', e.target.value)}
                placeholder="Cảnh báo trách nhiệm: Các trò chơi cá cược trực tuyến chỉ dành cho người từ đủ 18 tuổi trở lên..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOM SCRIPTS & TRACKING */}
        {activeTab === 'scripts' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                Mã Chèn Vào Header (&lt;head&gt;)
              </h3>
              <p className="text-xs text-slate-400">
                Thích hợp chèn: <strong>Google Analytics (gtag.js)</strong>, <strong>Google Tag Manager</strong>, <strong>Facebook Pixel</strong>, hoặc custom CSS font.
              </p>
              <textarea
                rows={6}
                value={settings.customHeadScripts || ''}
                onChange={(e) => handleChange('customHeadScripts', e.target.value)}
                placeholder="<!-- Google tag (gtag.js) -->&#10;<script async src='https://www.googletagmanager.com/gtag/js?id=G-XXXXX'></script>&#10;<script>...</script>"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                Mã Chèn Vào Footer (&lt;body&gt;)
              </h3>
              <p className="text-xs text-slate-400">
                Thích hợp chèn: <strong>Livechat Widget (Tawk.to, Crisp, Subiz)</strong>, Popup thông báo hoặc tracking events.
              </p>
              <textarea
                rows={6}
                value={settings.customBodyScripts || ''}
                onChange={(e) => handleChange('customBodyScripts', e.target.value)}
                placeholder="<!-- Tawk.to / Livechat script -->&#10;<script>...</script>"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        )}

        {/* Save button bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400">Mọi thay đổi sẽ được cập nhật trực tiếp trên toàn bộ website.</span>
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-xl shadow-amber-500/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang lưu...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Lưu Tất Cả Cài Đặt</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
