'use client';

import { Code, ContactRound, House, MailMinus, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/shared/style/utils';

import { NavigationLogo } from './NavigationLogo';
import { NavigationLogoDesktop } from './NavigationLogoDesktop';

const NAV_ITEMS = [
  { label: '홈', href: '#home', Icon: House },
  { label: '프로젝트', href: '#projects', Icon: Code },
  { label: '소개', href: '#about', Icon: ContactRound },
  { label: '연락하기', href: '#contact', Icon: MailMinus },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [openLogoLeft, setOpenLogoLeft] = useState(70);
  const ulRef = useRef<HTMLUListElement>(null);
  const closedLogoHeight = isMd ? 52 : 40;

  // 로고 반응형
  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateIsMd = () => setIsMd(mediaQuery.matches);

    updateIsMd();
    mediaQuery.addEventListener('change', updateIsMd);

    return () => mediaQuery.removeEventListener('change', updateIsMd);
  }, []);

  // 메뉴 오픈시 화면 사이즈 반응형 로고 이동
  useLayoutEffect(() => {
    if (!isOpen) return;

    const updateOpenLogoLeft = () => {
      const firstLink = ulRef.current?.querySelector<HTMLAnchorElement>('a');

      if (!firstLink) return;

      const menuLeft = firstLink.getBoundingClientRect().left;
      const navTransform = ulRef.current?.closest('nav');
      const transform = navTransform ? getComputedStyle(navTransform).transform : 'none';
      const translateX = transform && transform !== 'none' ? new DOMMatrixReadOnly(transform).m41 : 0;

      setOpenLogoLeft(menuLeft - translateX);
    };

    updateOpenLogoLeft();
    window.addEventListener('resize', updateOpenLogoLeft);

    return () => window.removeEventListener('resize', updateOpenLogoLeft);
  }, [isOpen]);

  return (
    <>
      <nav
        aria-label="데스크톱 사이드바"
        className={cn(
          'group/sidebar fixed top-0 left-0 z-[60] hidden h-dvh w-26 flex-col overflow-hidden bg-white text-[#171717] shadow-[8px_0_32px_rgba(0,0,0,0.08)]',
          'transition-[width] duration-200 ease-out hover:w-[316px] xl:flex',
        )}>
        <div className="shrink-0 items-center justify-center pt-2 pl-3">
          <NavigationLogoDesktop className="h-20" />
        </div>

        <ul className="mt-15 flex w-[300px] flex-col gap-2">
          {NAV_ITEMS.map(({ label, href, Icon }, index) => {
            const isActive = index === 0;

            return (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className={cn(
                    'group/a relative flex h-16 w-23 items-center text-[#171717] transition-all duration-150 group-hover/sidebar:w-full hover:bg-[#efefef]',
                    isActive && 'bg-[#efefef]',
                  )}>
                  {isActive && <span aria-hidden="true" className="absolute top-0 left-0 h-full w-3 bg-[#171717]" />}
                  <span className="flex w-27 shrink-0 items-center justify-center">
                    <Icon
                      className={cn(
                        'size-10 shrink-0 transition-all duration-150',
                        isActive ? 'text-[#171717]' : 'text-gray-300 group-hover/a:text-gray-400',
                      )}
                      strokeWidth={2.2}
                    />
                  </span>
                  <span
                    className={cn(
                      'pointer-events-none text-[16px] leading-none font-semibold whitespace-nowrap opacity-0 transition-opacity duration-150',
                      'group-hover/sidebar:pointer-events-auto group-hover/sidebar:opacity-100',
                    )}>
                    {label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 헤더 shadow bar — 메뉴 닫혔을 때만 */}
      <div className="pointer-events-none fixed top-0 right-0 left-0 z-[50] h-16 shadow-[0_3px_20px_1px_rgba(0,0,0,0.15)] md:h-20 xl:hidden" />

      {/* 로고 — fixed z-[70], 메뉴 열리면 오른쪽+아래로 이동하며 확대 */}
      <motion.div
        initial={false}
        animate={{
          top: isOpen ? 50 : 12,
          left: isOpen ? openLogoLeft : 24,
          height: isOpen ? 70 : closedLogoHeight,
        }}
        transition={{ duration: 0.2 }}
        className="fixed z-[70] overflow-hidden xl:hidden">
        <NavigationLogo className={cn('h-full w-auto')} />
      </motion.div>

      {/* 햄버거 / X 버튼 — fixed z-[70] */}
      <div className="fixed top-5 right-5 z-[70] xl:hidden">
        <button onClick={() => setIsOpen((o) => !o)} aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}>
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="x"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}>
                <X className="size-6 md:size-8" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}>
                <Menu className="size-6 md:size-8" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* 슬라이드 패널 — fixed inset-0 z-50, 전체화면 커버 */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white px-8 pt-40 xl:hidden">
            {/* 격자무늬 배경 */}
            <div
              className={cn(
                'pointer-events-none absolute inset-0',
                'bg-[linear-gradient(to_right,rgba(0,0,0,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.055)_1px,transparent_1px)]',
                'bg-[length:32px_32px]',
              )}
            />
            <ul ref={ulRef} className="relative z-10 flex flex-col items-center gap-2 md:gap-3">
              {NAV_ITEMS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="group flex min-w-[337px] items-center gap-3 bg-[#f2f2f2] px-4 py-3 text-lg font-semibold transition-colors hover:bg-accent md:min-w-[530px] md:py-5">
                    <Icon className="size-[26px] shrink-0 text-gray-400 group-hover:text-black md:size-[36px]" />
                    <div className={cn('flex w-full items-center justify-between', 'text-[16px] md:text-[24px]')}>
                      <span>| {label}</span>
                      <span>&gt;</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
