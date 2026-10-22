import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import { siteConfig } from '@/lib/site-config';
import './globals.css';

const sans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
});

const serif = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.launch.siteUrl),
  title: {
    default: `${siteConfig.brand.name} — regalos musicales que se escuchan`,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.description,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  verification: { google: 'Fgf7FoCcq6xx20FjJ4PdTLYmoyl-DYjEANj3TfWuMz8' },
  openGraph: {
    type: 'website',
    locale: siteConfig.brand.locale,
    siteName: siteConfig.brand.name,
    title: `${siteConfig.brand.name} — regalos musicales que se escuchan`,
    description: siteConfig.brand.description,
    images: [
      {
        url: '/images/dilo-hero-box-retro.png',
        width: 1670,
        height: 940,
        alt: 'Caja regalo DILO con vinilos, carta y detalles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brand.name} — regalos musicales que se escuchan`,
    description: siteConfig.brand.description,
    images: ['/images/dilo-hero-box-retro.png'],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: siteConfig.brand.name,
      url: siteConfig.launch.siteUrl,
      email: siteConfig.brand.email,
      description: siteConfig.brand.description,
    },
    {
      '@type': 'WebSite',
      name: siteConfig.brand.name,
      url: siteConfig.launch.siteUrl,
      inLanguage: 'es-ES',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${sans.variable} ${serif.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
