import { cn } from '@/shared/style/utils';

import { FACTS } from '../data/about';

export function AboutLead() {
  return (
    <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
      <div className="flex flex-col">
        <p
          className="font-semibold tracking-[-0.02em] text-black"
          style={{ fontSize: 'clamp(22px, 3vw, 38px)', lineHeight: 1.35 }}>
          사용자가 실제로 겪는{' '}
          <span className="relative inline-block">
            <span className="relative z-10">불편</span>
            <span aria-hidden="true" className="absolute inset-x-0 bottom-[0.1em] -z-0 h-[0.35em] bg-accent" />
          </span>
          을 발견하고, 그것을{' '}
          <span className="underline decoration-black decoration-2 underline-offset-4">이해하기 쉬운 화면</span>
          으로 바꿔 문제를 해결하는 일을 좋아합니다.
        </p>

        <p className={cn('mt-8 max-w-xl text-[15px] leading-[1.9] text-black/75', 'md:text-[16px] md:leading-[1.95]')}>
          Carokann과 Cernium은 반복 작업 관리의 불편함과 GMS 공지의 낮은 접근성이라는 문제를 명확히 정의하고 Next.js와
          TypeScript를 기반으로 직접 구현한 서비스입니다. 단순히 화면을 만드는 데 멈추지 않고, 데이터와 상태가 어떻게
          보여져야 한눈에 이해할 수 있는지, 시간과 흐름이 바뀌는 인터랙션을 어떻게 더 자연스럽게 전달할 수 있는지
          고민합니다.
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-px self-start border border-black/10 bg-black/10">
        {FACTS.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1 bg-white p-4 md:p-5">
            <dt className="font-jetbrains-mono text-[10px] tracking-[0.24em] text-black/50 md:text-[11px]">{fact.label}</dt>
            <dd className="text-[15px] font-medium text-black md:text-[16px]">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
