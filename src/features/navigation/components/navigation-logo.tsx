import { type SVGProps } from 'react';

import { cn } from '@/shared/style/utils';

type NavigationLogoProps = SVGProps<SVGSVGElement>;

export function NavigationLogo({ className, ...props }: NavigationLogoProps) {
  return (
    <svg
      viewBox="0 0 116 44"
      role="img"
      aria-label="YDJ Portfolio"
      className={cn('h-10 w-auto text-foreground', className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <text
        x="0"
        y="30"
        fill="currentColor"
        fontFamily="var(--font-pretendard), Arial, sans-serif"
        fontSize="28"
        fontWeight="900">
        YDJ
      </text>
      <rect x="1" y="35" width="54" height="4" rx="1" fill="#e6f700" />
      <text
        x="62"
        y="38"
        fill="#6b7280"
        fontFamily="var(--font-pretendard), Arial, sans-serif"
        fontSize="10"
        fontWeight="700">
        Portfolio
      </text>
    </svg>
  );
}
