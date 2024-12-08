export const SIDEBAR_TITLE: Record<string, string> = {
  '/portfolio': '포트폴리오',
  '/gathering': '게더링',
} as const;

import type { Category } from '@/shared/ui/SidebarFilter';

export const PROJECT_CATEGORIES: Category[] = [
  { id: 'all', name: '전체' },
  {
    id: 'project',
    name: '프로젝트',
    subItems: [
      { id: 'dev', name: '개발' },
      { id: 'design', name: '디자인' },
      { id: 'planning', name: '기획' },
      { id: 'startup', name: '창업' },
      { id: 'marketing', name: '마케팅' },
      { id: 'etc', name: '기타' },
    ],
  },
  {
    id: 'study',
    name: '스터디',
    subItems: [
      { id: 'dev', name: '개발' },
      { id: 'language', name: '어학' },
      { id: 'design', name: '디자인' },
      { id: 'etc', name: '기타' },
    ],
  },
  {
    id: 'club',
    name: '동아리',
    subItems: [
      { id: 'hobby', name: '취미' },
      { id: 'social', name: '친목' },
      { id: 'etc', name: '기타' },
    ],
  },
  { id: 'etc', name: '기타' },
];
