import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Footer from '@/components/layout/Footer';
import { getSiteSettings } from '@/lib/db';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL('https://keovip247.com'),
    title: {
      default: settings.siteTitle || 'KEOVIP247 - Top 10 Nhà Cái Uy Tín Nhất Việt Nam 2026',
      template: `%s | ${settings.siteName || 'KEOVIP247'}`,
    },
    description:
      settings.siteDescription ||
      'Chuyên trang đánh giá & xếp hạng nhà cái, cổng game bài uy tín số 1 Việt Nam. Link vào mới nhất tặng 199k tân thủ.',
    keywords: [
      'nha cai uy tin',
      'top nha cai',
      'cong game doi thuong',
      'danh gia nha cai',
      'tai xiu md5',
      'soi keo bong da',
      'khuyen mai nha cai',
      'keovip247',
    ],
    authors: [{ name: 'KEOVIP247 Team' }],
    creator: 'KEOVIP247',
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: 'https://keovip247.com',
      title: settings.siteTitle,
      description: settings.siteDescription,
      siteName: settings.siteName,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1200&auto=format&fit=crop&q=80',
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
      images: ['https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1200&auto=format&fit=crop&q=80'],
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

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.siteName,
    url: 'https://keovip247.com',
    logo: 'https://keovip247.com/images/logo.png',
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
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-amber-400 selection:text-slate-950">
        <AnnouncementBar text={settings.announcementBar} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
