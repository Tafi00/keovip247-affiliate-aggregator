import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Footer from '@/components/layout/Footer';
import { getSiteSettings } from '@/lib/db';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://keovip247.com';
  const ogImg = settings.ogImage || 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1200&h=630&auto=format&fit=crop&q=80';
  const keywordsList = settings.keywords
    ? settings.keywords.split(',').map((k) => k.trim()).filter(Boolean)
    : [
        'nha cai uy tin',
        'top nha cai',
        'cong game doi thuong',
        'danh gia nha cai',
        'tai xiu md5',
        'soi keo bong da',
        'khuyen mai nha cai',
        'keovip247',
      ];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.siteTitle || 'KEOVIP247 - Top 10 Nhà Cái Uy Tín Nhất Việt Nam 2026',
      template: `%s | ${settings.siteName || 'KEOVIP247'}`,
    },
    description:
      settings.siteDescription ||
      'Chuyên trang đánh giá & xếp hạng nhà cái, cổng game bài uy tín số 1 Việt Nam. Link vào mới nhất tặng 199k tân thủ.',
    keywords: keywordsList,
    icons: {
      icon: settings.favicon || '/favicon.ico',
      shortcut: settings.favicon || '/favicon.ico',
      apple: settings.logo || '/images/logo.png',
    },
    authors: [{ name: settings.siteName || 'KEOVIP247 Team' }],
    creator: settings.siteName || 'KEOVIP247',
    verification: {
      google: settings.googleVerification || undefined,
    },
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: siteUrl,
      title: settings.siteTitle,
      description: settings.siteDescription,
      siteName: settings.siteName,
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 630,
          alt: settings.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.siteTitle,
      description: settings.siteDescription,
      images: [ogImg],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://keovip247.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.siteName,
    url: siteUrl,
    logo: settings.logo || `${siteUrl}/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: settings.hotline,
      contactType: 'customer service',
      areaServed: 'VN',
      availableLanguage: 'Vietnamese',
    },
  };

  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {settings.customHeadScripts && (
          <div dangerouslySetInnerHTML={{ __html: settings.customHeadScripts }} />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-amber-400 selection:text-slate-950">
        <AnnouncementBar text={settings.announcementBar} />
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        {settings.customBodyScripts && (
          <div dangerouslySetInnerHTML={{ __html: settings.customBodyScripts }} />
        )}
      </body>
    </html>
  );
}
