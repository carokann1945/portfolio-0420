export const FACTS = [
  { label: 'ROLE', value: 'Frontend Engineer' },
  { label: 'BASED', value: 'Cheongju, KR' },
  { label: 'FOCUS', value: 'Interaction · UX' },
  { label: 'SINCE', value: '2026' },
  { label: 'SHIPPED', value: '2 live products' },
  { label: 'DAU', value: '~50 (Cernium)' },
] as const;

export const STRENGTHS = [
  {
    id: '01',
    title: '끝까지 파고드는 집요함',
    description: '막히는 문제를 덮어두지 않습니다. 근본적인 원인을 정의하고 해결될 때까지 물고 늘어집니다.',
  },
  {
    id: '02',
    title: '가리지 않는 유연함',
    description: '필요한 도구 · 언어 · 패러다임은 가리지 않고 배워 적용합니다. 문제에 맞는 해법을 선택합니다.',
  },
  {
    id: '03',
    title: '완성하는 책임감',
    description:
      '작은 디테일까지 신경 쓰며, LLM이 생성한 코드의 확실한 품질 검수까지 책임지는 태도를 중요하게 생각합니다.',
  },
] as const;

export type TimelineTone = 'accent' | 'solid' | 'muted';

export const TIMELINE: { time: string; title: string; description: string; tone: TimelineTone }[] = [
  {
    time: '2026 · 04',
    title: 'Cernium 런칭 · DAU 50 규모로 운영 중',
    description: '글로벌 메이플스토리(GMS)의 해외 시간대 공지와 이벤트 정보를 한국어 사용자 관점으로 재구성.',
    tone: 'accent',
  },
  {
    time: '2026 · 03',
    title: 'Carokann · 반복 작업 진척도 트래커',
    description: '완료 시 즉시 리셋되던 체크박스 UX를 "진척률이 보이는 주기 작업"으로 재설계.',
    tone: 'solid',
  },
  {
    time: '2026 · 학습',
    title: 'Frontend Mentor 30+ 챌린지 완주',
    description: 'HTML/CSS부터 반응형 레이아웃 · 컴포넌트 아키텍처까지 AI 코드 생성 없이 능숙해질 때까지 구현 연습.',
    tone: 'muted',
  },
];
