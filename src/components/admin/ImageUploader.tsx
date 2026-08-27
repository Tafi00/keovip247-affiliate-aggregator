'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Loader2, X, Link as LinkIcon } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = 'Ảnh đại diện / Logo',
  folder = '/affiliate-assets',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [directUrl, setDirectUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Dung lượng ảnh tối đa 5MB');
      return;
    }

    setErrorMsg('');
    setIsUploading(true);

    try {
      // Read as base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;

        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file: base64,
            fileName: file.name,
            folder,
          }),
        });

        const data = await res.json();
        if (data.success && data.url) {
          onChange(data.url);
          if (data.warning) {
            console.warn(data.warning);
          }
        } else {
          setErrorMsg(data.error || 'Upload không thành công');
        }
        setIsUploading(false);
      };

      reader.onerror = () => {
        setErrorMsg('Không thể đọc file');
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch {
      setErrorMsg('Đã xảy ra lỗi khi tải ảnh lên');
      setIsUploading(false);
    }
  };

  const handleDirectUrlApply = () => {
    if (directUrl.trim()) {
      onChange(directUrl.trim());
      setShowUrlInput(false);
      setDirectUrl('');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-amber-400 hover:underline flex items-center gap-1"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlInput ? 'Ẩn nhập URL' : 'Nhập URL trực tiếp'}
        </button>
      </div>

      {showUrlInput && (
        <div className="flex gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800">
          <input
            type="url"
            placeholder="https://example.com/logo.png"
            value={directUrl}
            onChange={(e) => setDirectUrl(e.target.value)}
            className="flex-1 bg-transparent text-xs text-white px-2 py-1 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleDirectUrlApply}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition"
          >
            Áp dụng
          </button>
        </div>
      )}

      {/* Preview or Drop Area */}
      {value ? (
        <div className="relative w-full h-36 rounded-2xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center overflow-hidden group">
          <img
            src={value}
            alt="Uploaded Preview"
            className="max-h-full max-w-full object-contain rounded-xl"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition shadow-lg opacity-90 group-hover:opacity-100"
            title="Xóa ảnh"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-32 rounded-2xl border-2 border-dashed border-slate-700 hover:border-amber-400/60 bg-slate-950/60 hover:bg-slate-900/80 cursor-pointer flex flex-col items-center justify-center gap-2 transition p-4 text-center"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-amber-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs font-semibold">Đang tải ảnh lên ImageKit...</span>
            </div>
          ) : (
            <>
              <div className="p-2.5 rounded-full bg-slate-800 text-amber-400">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-300">
                  Nhấp để tải ảnh lên (hoặc kéo thả)
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">PNG, JPG, WebP, SVG (Tối đa 5MB)</p>
              </div>
            </>
          )}
        </div>
      )}

      {errorMsg && <p className="text-xs text-rose-400">{errorMsg}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
