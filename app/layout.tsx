import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { CartProvider } from '@/lib/cart';
import { site } from '@/data/site';

const description =
  "IDRISIYA COUTURE is a luxury women's fashion boutique in Olowotedo Area, Ogun State, Nigeria. Discover elegant dresses, two-piece sets, corporate wear, occasion wear and accessories — the fashion hub, luxury for less. Order directly on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'IDRISIYA COUTURE — The Fashion Hub | Luxury for Less',
    template: '%s | IDRISIYA COUTURE',
  },
  description,
  keywords: [
    'IDRISIYA COUTURE',
    'Nigerian fashion boutique',
    'luxury womenswear Nigeria',
    'Ogun State boutique',
    'ankara two-piece set',
    'elegant dresses Nigeria',
    'occasion wear Lagos',
  ],
  authors: [{ name: 'IDRISIYA COUTURE' }],
  openGraph: {
    type: 'website',
    siteName: 'IDRISIYA COUTURE',
    title: 'IDRISIYA COUTURE — The Fashion Hub | Luxury for Less',
    description,
    locale: 'en_NG',
    images: [{ url: '/brand/idrisiya-logo.png', width: 1024, height: 1024, alt: 'IDRISIYA COUTURE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IDRISIYA COUTURE — The Fashion Hub',
    description,
    images: ['/brand/idrisiya-logo.png'],
  },
  icons: { icon: '/brand/idrisiya-logo.png', apple: '/brand/idrisiya-logo.png' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <body className="flex min-h-screen flex-col bg-ivory antialiased">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-gold focus:bg-ink focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-widest focus:text-gold-light"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}
