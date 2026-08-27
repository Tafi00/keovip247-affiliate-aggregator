import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'keovip_admin_token';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123456';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'keovip-super-secret-key-2026';

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function generateAdminToken(): string {
  // Simple HMAC-like / base64 encoded verifiable token
  const payload = JSON.stringify({
    role: 'admin',
    time: Date.now(),
    secret: ADMIN_SECRET,
  });
  return Buffer.from(payload).toString('base64');
}

export function verifyAdminToken(token: string | null | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parsed = JSON.parse(decoded);
    return parsed.role === 'admin' && parsed.secret === ADMIN_SECRET;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}
