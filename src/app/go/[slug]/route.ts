import { NextRequest, NextResponse } from 'next/server';
import { getBrandBySlug, incrementClick } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const brand = await getBrandBySlug(slug);

  if (!brand || !brand.affiliateUrl) {
    return NextResponse.redirect(new URL('/', request.url), 302);
  }

  // Increment affiliate click counter in DB / Redis
  try {
    await incrementClick(brand.slug);
  } catch (err) {
    console.error('Failed to log click:', err);
  }

  // Safe redirect with anti-SEO indexing headers for cloaking
  return new NextResponse(null, {
    status: 307,
    headers: {
      Location: brand.affiliateUrl,
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Referrer-Policy': 'no-referrer-when-downgrade',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  });
}
