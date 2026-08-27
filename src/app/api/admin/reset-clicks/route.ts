import { NextResponse } from 'next/server';
import { resetAllClicks } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function POST() {
  const auth = await isAdminAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await resetAllClicks();
    return NextResponse.json({ success: true, message: 'Đã xóa toàn bộ lượt click về 0 thành công' });
  } catch (error) {
    console.error('Error resetting clicks:', error);
    return NextResponse.json({ error: 'Failed to reset clicks' }, { status: 500 });
  }
}
