import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, generateAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json(
        { error: 'Mật khẩu quản trị không chính xác.' },
        { status: 401 }
      );
    }

    const token = generateAdminToken();
    const response = NextResponse.json({ success: true, message: 'Đăng nhập thành công' });

    // Set secure HTTP-only cookie for 7 days
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi máy chủ.' },
      { status: 500 }
    );
  }
}
