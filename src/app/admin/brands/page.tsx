'use client';

import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  ShieldCheck,
  Zap,
  Clock,
  Loader2,
  X,
  Check,
} from 'lucide-react';
import { Brand, BrandCategory } from '@/lib/types';
import ImageUploader from '@/components/admin/ImageUploader';
import AdminHeader from '@/components/admin/AdminHeader';
import { slugify } from '@/lib/utils';

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState<BrandCategory>('nha-cai');
  const [formLogo, setFormLogo] = useState('');
  const [formRating, setFormRating] = useState('4.9');
  const [formFoundedYear, setFormFoundedYear] = useState('2015');
  const [formBadge, setFormBadge] = useState('Tặng 199k Tân Thủ');
  const [formLicense, setFormLicense] = useState('PAGCOR Philippines');
  const [formWithdrawalSpeed, setFormWithdrawalSpeed] = useState('3 - 5 Phút');
  const [formMinDeposit, setFormMinDeposit] = useState('50.000 VNĐ');
  const [formBonus, setFormBonus] = useState('Thưởng 100% nạp đầu lên tới 5.000.000 VNĐ');
  const [formPros, setFormPros] = useState('Nạp rút tự động siêu tốc\nBảo mật SSL 256-bit');
  const [formCons, setFormCons] = useState('Giờ cao điểm cần đợi vài phút');
  const [formAffiliateUrl, setFormAffiliateUrl] = useState('https://example.com/aff');
  const [formReviewSlug, setFormReviewSlug] = useState('');
  const [formOrder, setFormOrder] = useState('1');
  const [formStatus, setFormStatus] = useState<'active' | 'inactive'>('active');

  const fetchBrands = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/brands');
      const data = await res.json();
      if (data.brands) {
        setBrands(data.brands);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const openCreateModal = () => {
    setEditingBrand(null);
    setFormName('');
    setFormSlug('');
    setFormCategory('nha-cai');
    setFormLogo('');
    setFormRating('4.9');
    setFormFoundedYear('2018');
    setFormBadge('Tặng 100% Nạp Đầu + 199K');
    setFormLicense('PAGCOR Philippines, Isle of Man');
    setFormWithdrawalSpeed('3 - 5 Phút');
    setFormMinDeposit('50.000 VNĐ');
    setFormBonus('100% nạp đầu lên đến 5.000.000 VNĐ');
    setFormPros('Nạp rút tự động siêu tốc\nBảo mật 2 lớp OTP');
    setFormCons('Cần xác thực số điện thoại để nhận thưởng');
    setFormAffiliateUrl('https://example.com/aff');
    setFormReviewSlug('');
    setFormOrder(String(brands.length + 1));
    setFormStatus('active');
    setIsModalOpen(true);
  };

  const openEditModal = (brand: Brand) => {
    setEditingBrand(brand);
    setFormName(brand.name);
    setFormSlug(brand.slug);
    setFormCategory(brand.category);
    setFormLogo(brand.logo);
    setFormRating(String(brand.rating));
    setFormFoundedYear(String(brand.foundedYear));
    setFormBadge(brand.badge);
    setFormLicense(brand.license);
    setFormWithdrawalSpeed(brand.withdrawalSpeed);
    setFormMinDeposit(brand.minDeposit);
    setFormBonus(brand.bonus);
    setFormPros(brand.pros.join('\n'));
    setFormCons(brand.cons.join('\n'));
    setFormAffiliateUrl(brand.affiliateUrl);
    setFormReviewSlug(brand.reviewSlug || '');
    setFormOrder(String(brand.order || 1));
    setFormStatus(brand.status || 'active');
    setIsModalOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormName(val);
    if (!editingBrand) {
      setFormSlug(slugify(val));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSlug.trim()) {
      alert('Vui lòng nhập Tên và Slug nhà cái');
      return;
    }

    setIsSaving(true);
    try {
      const brandPayload: Brand = {
        id: editingBrand ? editingBrand.id : `brand-${Date.now()}`,
        name: formName.trim(),
        slug: formSlug.trim(),
        category: formCategory,
        logo: formLogo.trim(),
        rating: parseFloat(formRating) || 4.8,
        foundedYear: parseInt(formFoundedYear, 10) || 2015,
        badge: formBadge.trim(),
        license: formLicense.trim(),
        withdrawalSpeed: formWithdrawalSpeed.trim(),
        minDeposit: formMinDeposit.trim(),
        bonus: formBonus.trim(),
        pros: formPros
          .split('\n')
          .map((p) => p.trim())
          .filter(Boolean),
        cons: formCons
          .split('\n')
          .map((c) => c.trim())
          .filter(Boolean),
        affiliateUrl: formAffiliateUrl.trim(),
        reviewSlug: formReviewSlug.trim() || `danh-gia-${formSlug.trim()}`,
        order: parseInt(formOrder, 10) || 1,
        clickCount: editingBrand ? editingBrand.clickCount : 0,
        isFeatured: parseInt(formOrder, 10) <= 3,
        status: formStatus,
        updatedAt: new Date().toISOString(),
      };

      const res = await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandPayload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchBrands();
      } else {
        const data = await res.json();
        alert(data.error || 'Không thể lưu nhà cái');
      }
    } catch {
      alert('Lỗi kết nối');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa nhà cái "${name}"?`)) return;

    try {
      const res = await fetch(`/api/brands?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchBrands();
      } else {
        alert('Không thể xóa nhà cái');
      }
    } catch {
      alert('Lỗi khi xóa');
    }
  };

  return (
    <div className="space-y-8 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AdminHeader
          title="Quản Lý Nhà Cái & Cổng Game"
          description="Quản lý thẻ nhà cái, link affiliate cloaking, upload logo và xếp hạng"
        />

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/20 transition flex-shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Nhà Cái Mới</span>
        </button>
      </div>

      {/* Brands Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-amber-400">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-semibold">Đang tải danh sách nhà cái...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="py-4 px-4 text-center w-14">Thứ Tự</th>
                  <th className="py-4 px-4 min-w-[200px]">Thương Hiệu</th>
                  <th className="py-4 px-4 min-w-[120px]">Phân Loại</th>
                  <th className="py-4 px-4 min-w-[100px]">Đánh Giá</th>
                  <th className="py-4 px-4 min-w-[140px]">Lượt Click</th>
                  <th className="py-4 px-4 min-w-[180px]">Link Cloaking</th>
                  <th className="py-4 px-4 min-w-[100px]">Trạng Thái</th>
                  <th className="py-4 px-4 text-center min-w-[120px]">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {brands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-4 text-center font-bold text-amber-400">
                      #{brand.order}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 p-0.5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {brand.logo ? (
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <span className="text-xs font-bold text-amber-400">
                              {brand.name.slice(0, 2)}
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{brand.name}</h4>
                          <span className="text-[11px] text-amber-400 font-medium">
                            {brand.badge}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="bg-slate-800 border border-slate-700 text-[11px] px-2.5 py-1 rounded-md text-slate-300 font-semibold">
                        {brand.category === 'nha-cai' ? 'Nhà Cái' : 'Cổng Game'}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{brand.rating.toFixed(1)}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-black text-white bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                        {(brand.clickCount || 0).toLocaleString()} clicks
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-sky-400">
                      <a
                        href={`/go/${brand.slug}`}
                        target="_blank"
                        className="hover:underline flex items-center gap-1"
                      >
                        <span>/go/{brand.slug}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          brand.status === 'active'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {brand.status === 'active' ? 'Hoạt động' : 'Tạm ẩn'}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(brand)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition"
                          title="Sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(brand.id, brand.name)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-300 transition"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Add / Edit Brand */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl my-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              {editingBrand ? `Chỉnh Sửa Nhà Cái: ${editingBrand.name}` : 'Thêm Nhà Cái / Cổng Game Mới'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Tên Nhà Cái *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={handleNameChange}
                    placeholder="VD: BK8"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Slug URL * (/go/[slug])</label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="VD: bk8"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Phân Loại</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as BrandCategory)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="nha-cai">Nhà Cái Uy Tín</option>
                    <option value="cong-game">Cổng Game Bài Đổi Thưởng</option>
                  </select>
                </div>

                {/* Order */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Thứ Tự Xếp Hạng (#)</label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Logo Upload with ImageKit */}
              <div className="pt-2">
                <ImageUploader
                  value={formLogo}
                  onChange={setFormLogo}
                  label="Logo Thương Hiệu (Upload lên ImageKit)"
                  folder="/brand-logos"
                />
              </div>

              {/* Affiliate Link */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-400">
                  Link Affiliate Đích (Khi user bấm Cược Ngay) *
                </label>
                <input
                  type="url"
                  required
                  value={formAffiliateUrl}
                  onChange={(e) => setFormAffiliateUrl(e.target.value)}
                  placeholder="https://aff.partner.com/track?id=123"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Rating */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Điểm Đánh Giá (1 - 5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formRating}
                    onChange={(e) => setFormRating(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Founded Year */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Năm Thành Lập</label>
                  <input
                    type="number"
                    value={formFoundedYear}
                    onChange={(e) => setFormFoundedYear(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Withdrawal Speed */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Tốc Độ Rút Tiền</label>
                  <input
                    type="text"
                    value={formWithdrawalSpeed}
                    onChange={(e) => setFormWithdrawalSpeed(e.target.value)}
                    placeholder="VD: 3 - 5 Phút"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Badge */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Badge Khuyến Mãi Ngắn</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="VD: Tặng 200% Nạp Đầu"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* License */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Giấy Phép</label>
                  <input
                    type="text"
                    value={formLicense}
                    onChange={(e) => setFormLicense(e.target.value)}
                    placeholder="VD: PAGCOR, Curacao"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Bonus Detail */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Gói Thưởng Chào Mừng Chi Tiết</label>
                <input
                  type="text"
                  value={formBonus}
                  onChange={(e) => setFormBonus(e.target.value)}
                  placeholder="VD: Thưởng chào mừng 200% lên tới 6.800.000 VNĐ"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-emerald-400">Ưu Điểm (Mỗi dòng 1 ý)</label>
                  <textarea
                    rows={3}
                    value={formPros}
                    onChange={(e) => setFormPros(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-rose-400">Nhược Điểm (Mỗi dòng 1 ý)</label>
                  <textarea
                    rows={3}
                    value={formCons}
                    onChange={(e) => setFormCons(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingBrand ? 'Cập Nhật' : 'Lưu Nhà Cái'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
