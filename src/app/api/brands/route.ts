import { NextRequest, NextResponse } from 'next/server';
import { getBrands, saveBrand, deleteBrand } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const brands = await getBrands();
    return NextResponse.json({ brands });
  } catch {
    return NextResponse.json({ error: 'Không thể lấy dữ liệu nhà cái' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ error: 'Tên và đường dẫn slug là bắt buộc' }, { status: 400 });
    }

    const saved = await saveBrand(body);
    return NextResponse.json({ success: true, brand: saved });
  } catch {
    return NextResponse.json({ error: 'Lỗi khi lưu nhà cái' }, { status: 500 });
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
      return NextResponse.json({ error: 'Thiếu ID nhà cái' }, { status: 400 });
    }

    await deleteBrand(id);
    return NextResponse.json({ success: true, message: 'Đã xóa thành công' });
  } catch {
    return NextResponse.json({ error: 'Lỗi khi xóa nhà cái' }, { status: 500 });
  }
}
