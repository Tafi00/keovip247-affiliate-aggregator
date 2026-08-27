'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  Save,
  ArrowLeft,
  Eye,
  Edit3,
  Loader2,
  Sparkles,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Link2,
  Table,
  Quote,
  ListOrdered,
  Star,
} from 'lucide-react';
import { Article, ArticleCategory } from '@/lib/types';
import ImageUploader from '@/components/admin/ImageUploader';
import MarkdownRenderer from '@/components/articles/MarkdownRenderer';
import { slugify } from '@/lib/utils';

export default function ArticleEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === 'new';

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Article Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('top-nha-cai');
  const [thumbnail, setThumbnail] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Chuyên gia Kèo VIP');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (!isNew) {
      const fetchArticle = async () => {
        setIsLoading(true);
        try {
          const res = await fetch('/api/articles');
          const data = await res.json();
          if (data.articles) {
            const current = data.articles.find((a: Article) => a.id === id);
            if (current) {
              setTitle(current.title);
              setSlug(current.slug);
              setCategory(current.category);
              setThumbnail(current.thumbnail || '');
              setSummary(current.summary || '');
              setContent(current.content || '');
              setAuthor(current.author || 'Chuyên gia Kèo VIP');
              setMetaTitle(current.seo?.metaTitle || '');
              setMetaDescription(current.seo?.metaDescription || '');
              setKeywords(current.seo?.keywords || '');
              setStatus(current.status || 'published');
              setViews(current.views || 0);
            }
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchArticle();
    }
  }, [id, isNew]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (isNew) {
      const genSlug = slugify(val);
      setSlug(genSlug);
      setMetaTitle(val);
    }
  };

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end) || 'Văn bản mẫu';
    const replacement = `${prefix}${selected}${suffix}`;

    setContent(
      textarea.value.substring(0, start) +
        replacement +
        textarea.value.substring(end)
    );

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      );
    }, 0);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      alert('Vui lòng nhập Tiêu đề và Slug bài viết');
      return;
    }

    setIsSaving(true);
    try {
      const articlePayload: Article = {
        id: isNew ? `art-${Date.now()}` : id,
        title: title.trim(),
        slug: slug.trim(),
        category,
        thumbnail: thumbnail.trim(),
        summary: summary.trim(),
        content: content.trim(),
        author: author.trim(),
        views: views || 0,
        seo: {
          metaTitle: metaTitle.trim() || title.trim(),
          metaDescription: metaDescription.trim() || summary.trim(),
          keywords: keywords.trim(),
        },
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articlePayload),
      });

      if (res.ok) {
        alert('Đã lưu bài viết thành công!');
        router.push('/admin/articles');
      } else {
        const data = await res.json();
        alert(data.error || 'Lỗi khi lưu bài viết');
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
        <span className="text-xs font-semibold">Đang tải bài viết...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 sm:p-8 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-white">
              {isNew ? 'Soạn Bài Viết Mới' : `Chỉnh Sửa: ${title}`}
            </h1>
            <p className="text-xs text-slate-400">
              Trình soạn thảo Markdown, hỗ trợ tạo mục lục tự động và tối ưu SEO
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang lưu...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Lưu Bài Viết</span>
              </>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Tiêu Đề Bài Viết (H1) *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="VD: Top 10 Nhà Cái Uy Tín Nhất Việt Nam 2026"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-bold placeholder-slate-600 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Đường Dẫn Slug URL * (/bai-viet/[slug])
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="top-10-nha-cai-uy-tin-nhat-viet-nam"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Summary */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Mô Tả Ngắn (Summary)
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Tóm tắt ngắn gọn nội dung bài viết hiển thị ở danh mục và đầu bài..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Markdown Content Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-slate-900 px-4 py-2 rounded-t-xl border border-slate-800">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-1">
                <button
                  type="button"
                  onClick={() => insertFormatting('\n## ', '\n')}
                  className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800"
                  title="Heading 2"
                >
                  <Heading2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('\n### ', '\n')}
                  className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800"
                  title="Heading 3"
                >
                  <Heading3 className="w-4 h-4" />
                </button>
                <span className="text-slate-700">|</span>
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800"
                  title="In đậm"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800"
                  title="In nghiêng"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('[', '](https://example.com)')}
                  className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800"
                  title="Chèn link"
                >
                  <Link2 className="w-4 h-4" />
                </button>
                <span className="text-slate-700">|</span>
                <button
                  type="button"
                  onClick={() =>
                    insertFormatting(
                      '\n| Cột 1 | Cột 2 |\n| :--- | :--- |\n| Nội dung 1 | Nội dung 2 |\n'
                    )
                  }
                  className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800"
                  title="Chèn bảng so sánh"
                >
                  <Table className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('\n> ', '\n')}
                  className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800"
                  title="Trích dẫn"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('\n1. ', '\n2. \n3. ')}
                  className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800"
                  title="Danh sách số"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
              </div>

              {/* Tab Toggle */}
              <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
                    activeTab === 'editor'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Soạn Thảo
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
                    activeTab === 'preview'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Xem Trước
                </button>
              </div>
            </div>

            {/* Content Area */}
            {activeTab === 'editor' ? (
              <textarea
                id="markdown-textarea"
                rows={18}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập nội dung bài viết bằng định dạng Markdown..."
                className="w-full bg-slate-950 border border-slate-800 rounded-b-xl p-4 text-xs sm:text-sm text-white font-mono leading-relaxed focus:outline-none focus:border-amber-400 font-normal"
              />
            ) : (
              <div className="bg-slate-950 border border-slate-800 rounded-b-xl p-6 min-h-[380px] overflow-y-auto">
                <MarkdownRenderer content={content || '*Chưa có nội dung để xem trước*'} />
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Metadata & SEO */}
        <div className="space-y-6">
          {/* Publishing Settings */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Cài Đặt Xuất Bản
            </h3>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Chuyên Mục</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="top-nha-cai">Top Nhà Cái</option>
                <option value="cong-game">Cổng Game</option>
                <option value="khuyen-mai">Khuyến Mãi</option>
                <option value="soi-keo">Soi Kèo</option>
                <option value="huong-dan">Hướng Dẫn</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Trạng Thái</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="published">Đã Xuất Bản (Hiển thị)</option>
                <option value="draft">Bản Nháp (Ẩn)</option>
              </select>
            </div>

            {/* Author */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Tác Giả</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Thumbnail Uploader */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5">
            <ImageUploader
              value={thumbnail}
              onChange={setThumbnail}
              label="Ảnh Đại Diện (Upload ImageKit)"
              folder="/article-thumbnails"
            />
          </div>

          {/* SEO Meta Box */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Cấu Hình SEO Chuẩn Google
            </h3>

            {/* Meta Title */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-300">SEO Title</span>
                <span className="text-slate-500">{metaTitle.length}/60</span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Tiêu đề hiển thị trên Google..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Meta Description */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-300">Meta Description</span>
                <span className="text-slate-500">{metaDescription.length}/160</span>
              </div>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Mô tả tóm tắt hiển thị trên kết quả tìm kiếm..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Keywords */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Từ Khóa (Keywords)</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="nha cai uy tin, danh gia nha cai..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
