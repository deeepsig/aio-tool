import type { Metadata } from 'next';
import { Geist, Geist_Mono, VT323 } from 'next/font/google';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const vt323 = VT323({
  variable: '--font-vt323',
  subsets: ['latin'],
  weight: '400', // VT323 only has one weight
});

export const metadata: Metadata = {
  title: 'Is your site still relevant??',
  description:
    'Analyze and optimize your robots.txt file for AI crawlers. Check if your website is properly configured for AI-driven search engines and digital assistants.',
  metadataBase: new URL('https://robots.deeepsig.me'),
  openGraph: {
    title: 'Is your site still relevant??',
    description:
      'Analyze and optimize your robots.txt file for AI crawlers. Check if your website is properly configured for AI-driven search engines and digital assistants.',
    url: 'https://robot.deeepsig.me',
    siteName: 'Optimize robots.txt',
    images: [
      {
        url: '/metadata.webp',
        width: 1200,
        height: 630,
        alt: 'Optimize robots.txt - AI Optimization Analysis Tool',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is your site still relevant??',
    description: 'Analyze and optimize your robots.txt file for AI crawlers.',
    images: ['/metadata.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vt323.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
