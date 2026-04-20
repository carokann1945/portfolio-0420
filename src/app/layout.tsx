import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'portfolio-0420',
  description: '윤동주 포트폴리오',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
