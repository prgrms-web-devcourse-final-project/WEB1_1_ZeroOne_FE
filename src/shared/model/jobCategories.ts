import type { Category } from '@/shared/ui/SidebarFilter/types';

export const JOB_CATEGORIES: Category[] = [
  { id: 'all', name: '전체' },
  {
    id: 'DEVELOPER',
    name: '개발',
    subItems: [
      { id: 'FRONTEND', name: '프론트엔드 개발자' },
      { id: 'BACKEND', name: '서버/백엔드 개발자' },
      { id: 'FULL_STACK', name: '풀스택 개발자' },
      { id: 'SOFTWARE', name: '소프트웨어 엔지니어' },
      { id: 'ANDROID', name: 'Android 개발자' },
      { id: 'IOS', name: 'IOS 개발자' },
      { id: 'CROSS_PLATFORM', name: '크로스플랫폼 앱 개발자' },
      { id: 'DEV_OPS', name: 'DevOps 엔지니어' },
      { id: 'SYSTEM', name: '시스템/네트워크 관리' },
      { id: 'MACHINE_LEARNING', name: '머신러닝 엔지니어' },
      { id: 'QA', name: 'QA 엔지니어' },
      { id: 'DATA_ENGINEER', name: '데이터 엔지니어' },
      { id: 'DATA_SCIENCE', name: '데이터 사이언티스트' },
      { id: 'SECURITY', name: '보안 엔지니어' },
      { id: 'HW_EMBEDDED', name: 'HW/임베디드 개발자' },
      { id: 'BLOCK_CHAIN', name: '블록체인 엔지니어' },
      { id: 'DBA', name: 'DBA' },
      { id: 'GAME', name: '게임 개발자' },
      { id: 'ETC_DEV', name: '기타' },
    ],
  },
  {
    id: 'PROMOTER',
    name: '기획',
    subItems: [
      { id: 'PM_PO', name: 'PM ∘ PO' },
      { id: 'SERVICE', name: '서비스 기획자' },
      { id: 'STRATEGY', name: '전략 기획자' },
      { id: 'BUSINESS', name: '사업개발 기획자' },
      { id: 'ANALYSIS', name: '비즈니스 분석가' },
      { id: 'MD', name: '상품 기획자/MD' },
      { id: 'ETC_PROM', name: '다른 기획 분야' },
    ],
  },
  {
    id: 'DESIGN',
    name: '디자인',
    subItems: [
      { id: 'DESIGN', name: '일반 디자인' },
      { id: 'INSPIRATION', name: '인스퍼레이션' },
      { id: 'UI_UX', name: 'UI/UX' },
      { id: 'WITH_CODING', name: '코딩하는 디자이너' },
      { id: 'BRAND', name: '브랜드 디자이너' },
      { id: 'TYPO', name: '타이포그래피' },
      { id: 'RESOURCE', name: '디자인 리소스' },
    ],
  },
  {
    id: 'MARKETING',
    name: '마케팅',
    subItems: [
      { id: 'MARKETING', name: '일반 마케팅' },
      { id: 'BRAND', name: '브랜드 마케팅' },
      { id: 'GROWTH', name: '그로스 마케팅' },
      { id: 'CONTENTS', name: '콘텐츠 마케팅' },
      { id: 'INSIGHT', name: '마케팅 인사이트' },
    ],
  },
  {
    id: 'ETC',
    name: '기타',
    subItems: [
      { id: 'SERVICE', name: '서비스 업' },
      { id: 'DISTRIBUTION', name: '판매, 유통' },
      { id: 'CONSTRUCT', name: '건설업' },
      { id: 'DELIVERY', name: '운전, 운송, 배송' },
      { id: 'EDUCATION', name: '교육업' },
      { id: 'FINANCE', name: '은행, 금융업' },
      { id: 'WELFARE', name: '공공, 복지' },
      { id: 'ETC', name: '그 외' },
    ],
  },
];
