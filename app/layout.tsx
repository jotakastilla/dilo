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
    default: `${siteConfig.brand.name} — regalos musicales con historia`,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.brand.locale,
    siteName: siteConfig.brand.name,
    title: `${siteConfig.brand.name} — regalos musicales con historia`,
    description: siteConfig.brand.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${sans.variable} ${serif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
