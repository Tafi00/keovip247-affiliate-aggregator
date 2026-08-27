'use client';

import React, { useState } from 'react';
import { RotateCcw, Loader2, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ResetClicksButton() {
  const [isResetting, setIsResetting] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa tất cả lượt click của tất cả nhà cái về 0?')) {
      return;
    }

    setIsResetting(true);
    try {
      const res = await fetch('/api/admin/reset-clicks', {
        method: 'POST',
      });

      if (res.ok) {
        setDone(true);
        router.refresh();
        setTimeout(() => setDone(false), 3000);
      } else {
        alert('Không thể reset lượt click');
      }
    } catch {
      alert('Lỗi kết nối máy chủ');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      disabled={isResetting}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-rose-500/20 hover:border-rose-500/40 border border-slate-800 transition disabled:opacity-50 cursor-pointer"
      title="Reset tất cả lượt click về 0"
    >
      {isResetting ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
      ) : done ? (
        <Check className="w-3.5 h-3.5 text-emerald-400" />
      ) : (
        <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
      )}
      <span>{done ? 'Đã xóa về 0' : 'Clear Clicks'}</span>
    </button>
  );
}
