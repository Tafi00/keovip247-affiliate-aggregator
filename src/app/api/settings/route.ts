import { NextRequest, NextResponse } from 'next/server';
import { getSiteSettings, saveSiteSettings } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ error: 'Không thể lấy thông tin cấu hình' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const saved = await saveSiteSettings(body);
    return NextResponse.json({ success: true, settings: saved });
  } catch {
    return NextResponse.json({ error: 'Lỗi khi lưu cấu hình' }, { status: 500 });
  }
}
