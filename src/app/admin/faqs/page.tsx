'use client';

import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  X,
  Check,
  Sparkles,
} from 'lucide-react';
import { FAQ } from '@/lib/types';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [order, setOrder] = useState('1');

  const fetchFAQs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/faqs');
      const data = await res.json();
      if (data.faqs) {
        setFaqs(data.faqs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const openCreateModal = () => {
    setEditingFAQ(null);
    setQuestion('');
    setAnswer('');
    setOrder(String(faqs.length + 1));
    setIsModalOpen(true);
  };

  const openEditModal = (faq: FAQ) => {
    setEditingFAQ(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setOrder(String(faq.order || 1));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      alert('Vui lòng nhập đầy đủ câu hỏi và câu trả lời');
      return;
    }

    setIsSaving(true);
    try {
      const faqPayload: FAQ = {
        id: editingFAQ ? editingFAQ.id : `faq-${Date.now()}`,
        question: question.trim(),
        answer: answer.trim(),
        order: parseInt(order, 10) || 1,
      };

      const res = await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqPayload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchFAQs();
      } else {
        const data = await res.json();
        alert(data.error || 'Lỗi khi lưu FAQ');
      }
    } catch {
      alert('Lỗi kết nối');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, q: string) => {
    if (!confirm(`Bạn có chắc muốn xóa câu hỏi "${q}"?`)) return;

    try {
      const res = await fetch(`/api/faqs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchFAQs();
      } else {
        alert('Không thể xóa câu hỏi');
      }
    } catch {
      alert('Lỗi khi xóa');
    }
  };

  return (
    <div className="space-y-8 p-6 sm:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AdminHeader
          title="Quản Lý Câu Hỏi Thường Gặp (FAQ)"
          description="Các câu hỏi sẽ tự động tạo Schema FAQPage JSON-LD hiển thị trên kết quả tìm kiếm Google"
        />

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/20 transition flex-shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Câu Hỏi Mới</span>
        </button>
      </div>

      {/* FAQs List */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-amber-400">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-semibold">Đang tải FAQ...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition space-y-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-xs font-black text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      #{faq.order}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{faq.question}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(faq)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition"
                      title="Sửa"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id, faq.question)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-300 transition"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Add / Edit FAQ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-lg font-black text-white mb-5 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              {editingFAQ ? 'Chỉnh Sửa Câu Hỏi FAQ' : 'Thêm Câu Hỏi FAQ Mới'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Câu Hỏi *</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="VD: Làm sao để nhận tiền cược miễn phí?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Câu Trả Lời *</label>
                <textarea
                  rows={4}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Nhập nội dung giải đáp chi tiết..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Thứ Tự Hiển Thị (#)</label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

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
                  className="px-5 py-2 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-md transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingFAQ ? 'Cập Nhật' : 'Lưu Câu Hỏi'}</span>
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
