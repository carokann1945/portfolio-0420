import type { StaticImageData } from 'next/image';

import carokannDesktop from '@/shared/assets/images/carokann-desktop.png';
import cerniumDesktop from '@/shared/assets/images/cernium-desktop.png';

export type ProjectLink = { label: string; href: string; icon?: string };

export type SubProject = {
  name: string;
  meta: string;
  description: string;
  parentLabel: string;
  links: ProjectLink[];
};

export type Project = {
  index: string;
  name: string;
  description: string;
  tags: string[];
  image: { src: StaticImageData; alt: string };
  links: ProjectLink[];
  subProject?: SubProject;
};

export const PROJECTS: Project[] = [
  {
    index: '01',
    name: 'Cernium',
    description:
      'Cernium은 영어 및 해외 시간대(UTC, PDT) 기반 GMS(글로벌 메이플스토리) 공지의 낮은 접근성과, 이벤트 정보가 분산된 문제를 해결하기 위해 제작했습니다. 2026년 4월부터 개발 중이며 DAU 100명 규모로 운영되고 있습니다. Next.js와 Typescript 기반으로 제작되었으며 데이터 수집을 위한 서브 프로젝트는 Node.js 기반으로 제작되었습니다.',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Tailwind'],
    image: { src: cerniumDesktop, alt: 'Cernium preview' },
    links: [
      { label: 'README', href: '#', icon: '📝' },
      { label: 'Github', href: 'https://github.com/carokann1945/cernium', icon: '⎇' },
      { label: 'cernium.app', href: 'https://cernium.app/', icon: '↗' },
    ],
    subProject: {
      name: 'gms-tracker',
      meta: 'Node.js · 데이터 수집',
      description:
        'Cernium 본 서비스에 공급할 GMS 공지·이벤트 데이터를 주기적으로 수집·정제하는 백그라운드 수집기입니다.',
      parentLabel: 'OF CERNIUM',
      links: [
        { label: 'README', href: '#', icon: '📝' },
        { label: 'Github', href: 'https://github.com/carokann1945/gms-tracker', icon: '⎇' },
      ],
    },
  },
  {
    index: '02',
    name: 'Carokann',
    description:
      '기존 작업 관리 서비스들은 반복 작업에서 작업을 완료하면 즉시 체크가 해제되어 작업의 진척도를 확인하기 어려운 문제를 해결하기 위해 제작했습니다. 이 서비스는 사용자가 다양한 반복 주기를 자유롭게 설정할 수 있도록 지원하며, 반복 작업의 진척도를 직접 눈으로 확인할 수 있도록 했습니다.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Motion'],
    image: { src: carokannDesktop, alt: 'Carokann preview' },
    links: [
      { label: 'README', href: '#', icon: '📝' },
      { label: 'Github', href: 'https://github.com/carokann1945/carokann', icon: '⎇' },
      { label: 'carokann.app', href: 'https://carokann.app/', icon: '↗' },
    ],
  },
];
