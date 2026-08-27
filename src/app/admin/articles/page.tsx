'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Loader2,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { Article } from '@/lib/types';
import AdminHeader from '@/components/admin/AdminHeader';
import { formatDate } from '@/lib/utils';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      if (data.articles) {
        setArticles(data.articles);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) return;

    try {
      const res = await fetch(`/api/articles?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchArticles();
      } else {
        alert('Không thể xóa bài viết');
      }
    } catch {
      alert('Lỗi khi xóa');
    }
  };

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="space-y-8 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AdminHeader
          title="Quản Lý Bài Viết & Cẩm Nang"
          description="Soạn thảo bài viết chuẩn SEO, review nhà cái và hướng dẫn cá cược"
        />

        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/20 transition flex-shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Soạn Bài Viết Mới</span>
        </Link>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'Tất Cả' },
          { id: 'top-nha-cai', label: 'Top Nhà Cái' },
          { id: 'cong-game', label: 'Cổng Game' },
          { id: 'khuyen-mai', label: 'Khuyến Mãi' },
          { id: 'soi-keo', label: 'Soi Kèo' },
          { id: 'huong-dan', label: 'Hướng Dẫn' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedCategory === cat.id
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-amber-400">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-semibold">Đang tải danh sách bài viết...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="py-4 px-4 min-w-[280px]">Bài Viết</th>
                  <th className="py-4 px-4 min-w-[130px]">Chuyên Mục</th>
                  <th className="py-4 px-4 min-w-[120px]">Tác Giả</th>
                  <th className="py-4 px-4 min-w-[100px]">Lượt Đọc</th>
                  <th className="py-4 px-4 min-w-[120px]">Ngày Đăng</th>
                  <th className="py-4 px-4 min-w-[100px]">Trạng Thái</th>
                  <th className="py-4 px-4 text-center min-w-[120px]">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex-shrink-0">
                          <img
                            src={article.thumbnail || 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=200&auto=format&fit=crop&q=80'}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 max-w-sm">
                          <h4 className="font-bold text-white line-clamp-1 text-sm">{article.title}</h4>
                          <span className="text-[11px] text-slate-500 font-mono">
                            /bai-viet/{article.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="bg-slate-800 text-[11px] text-amber-300 font-bold px-2.5 py-1 rounded-md border border-slate-700">
                        {article.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-400">
                      {article.author || 'Kèo VIP'}
                    </td>

                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1 text-slate-300 font-semibold">
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        {(article.views || 0).toLocaleString()}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-400">
                      {formatDate(article.createdAt)}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          article.status === 'published'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {article.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/bai-viet/${article.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                          title="Xem trang"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition"
                          title="Sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
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
    </div>
  );
}
