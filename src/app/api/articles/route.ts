import { NextRequest, NextResponse } from 'next/server';
import { getArticles, saveArticle, deleteArticle } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const articles = await getArticles();
    return NextResponse.json({ articles });
  } catch {
    return NextResponse.json({ error: 'Không thể lấy dữ liệu bài viết' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'Tiêu đề và đường dẫn slug là bắt buộc' }, { status: 400 });
    }

    const saved = await saveArticle(body);
    return NextResponse.json({ success: true, article: saved });
  } catch {
    return NextResponse.json({ error: 'Lỗi khi lưu bài viết' }, { status: 500 });
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
      return NextResponse.json({ error: 'Thiếu ID bài viết' }, { status: 400 });
    }

    await deleteArticle(id);
    return NextResponse.json({ success: true, message: 'Đã xóa thành công' });
  } catch {
    return NextResponse.json({ error: 'Lỗi khi xóa bài viết' }, { status: 500 });
  }
}
