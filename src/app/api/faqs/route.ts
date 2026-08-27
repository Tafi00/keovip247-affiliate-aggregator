import { NextRequest, NextResponse } from 'next/server';
import { getFAQs, saveFAQ, deleteFAQ } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const faqs = await getFAQs();
    return NextResponse.json({ faqs });
  } catch {
    return NextResponse.json({ error: 'Không thể lấy danh sách câu hỏi FAQ' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.question || !body.answer) {
      return NextResponse.json({ error: 'Câu hỏi và câu trả lời là bắt buộc' }, { status: 400 });
    }

    const saved = await saveFAQ(body);
    return NextResponse.json({ success: true, faq: saved });
  } catch {
    return NextResponse.json({ error: 'Lỗi khi lưu FAQ' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Thiếu ID câu hỏi' }, { status: 400 });
    }

    await deleteFAQ(id);
    return NextResponse.json({ success: true, message: 'Đã xóa thành công' });
  } catch {
    return NextResponse.json({ error: 'Lỗi khi xóa câu hỏi' }, { status: 500 });
  }
}
