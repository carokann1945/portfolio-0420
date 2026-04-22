import './globals.css';

import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import IntroLoader from '@/features/intro/components/IntroLoader';
import { IntroLoadingProvider } from '@/features/intro/components/IntroLoadingContext';
import Navigation from '@/features/navigation/components/Navigation';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: '윤동주 | 포트폴리오',
  description: '윤동주 포트폴리오',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}>
      <body>
        <IntroLoadingProvider>
          <Navigation />
          <IntroLoader />
          {children}
        </IntroLoadingProvider>
      </body>
    </html>
  );
}
