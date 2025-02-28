import type { ApiResponse } from '@/shared/api';
export enum MajorJobGroup {
  DEVELOPER = '개발',
  PROMOTER = '기획',
  DESIGN = '디자인',
  MARKETING = '마케팅',
  ETC = '기타',
}

export enum DeveloperJobGroup {
  FRONTEND = '프론트엔드 개발자',
  BACKEND = '서버/백엔드 개발자',
  FULL_STACK = '풀스택 개발자',
  SOFTWARE = '소프트웨어 엔지니어',
  ANDROID = 'Android 개발자',
  IOS = 'IOS 개발자',
  CROSS_PLATFORM = '크로스플랫폼 앱 개발자',
  DEV_OPS = 'DevOps 엔지니어',
  SYSTEM = '시스템/네트워크 관리',
  MACHINE_LEARNING = '머신러닝 엔지니어',
  QA = 'QA 엔지니어',
  DATA_ENGINEER = '데이터 엔지니어',
  DATA_SCIENCE = '데이터 사이언티스트',
  SECURITY = '보안 엔지니어',
  HW_EMBEDDED = 'HW/임베디드 개발자',
  BLOCK_CHAIN = '블록체인 엔지니어',
  DBA = 'DBA',
  GAME = '게임 개발자',
  ETC_DEV = '기타',
}

export enum PromoterJobGroup {
  PM_PO = 'PM ∘ PO',
  SERVICE = '서비스 기획자',
  STRATEGY = '전략 기획자',
  BUSINESS = '사업개발 기획자',
  ANALYSIS = '비즈니스 분석가',
  MD = '상품 기획자/MD',
  ETC_PROM = '다른 기획 분야',
}

export enum DesignJobGroup {
  DESIGN = '일반 디자인',
  INSPIRATION = '인스퍼레이션',
  UI_UX = 'UI/UX',
  WITH_CODING = '코딩하는 디자이너',
  BRAND_DESIGN = '브랜드 디자이너',
  TYPO = '타이포그래피',
  RESOURCE = '디자인 리소스',
}

export enum MarketingJobGroup {
  MARKETING = '일반 마케팅',
  BRAND = '브랜드 마케팅',
  GROWTH = '그로스 마케팅',
  CONTENTS = '콘텐츠 마케팅',
  INSIGHT = '마케팅 인사이트',
}

export enum EtcJobGroup {
  ETC_SERVICE = '서비스 업',
  DISTRIBUTION = '판매, 유통',
  CONSTRUCT = '건설업',
  DELIVERY = '운전, 운송, 배송',
  EDUCATION = '교육업',
  FINANCE = '은행, 금융업',
  WELFARE = '공공, 복지',
  ETC = '그 외',
}

// API Parameters Interface
export interface PortfolioParams {
  page?: number;
  size?: number;
  sort?: PortfolioSortOpts;
  majorJobGroup?: MajorJobGroup;
  minorJobGroup?: MinorJobGroup;
}

export type MinorJobGroup =
  | DeveloperJobGroup
  | PromoterJobGroup
  | DesignJobGroup
  | MarketingJobGroup
  | EtcJobGroup;

type PortfolioSortOpts = 'latest' | 'popularity';

export interface Portfolio {
  portFolioId: number;
  userId: number;
  jobTitle: string | null;
  portFolioUrl: string;
  username: string;
  introduction: string;
  majorJobGroup: MajorJobGroup;
  minorJobGroup: MinorJobGroup;
  memberImageUrl: string;
  relatedUrl: string[];
}

// Pageable Interface
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

// Sort Interface
export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

// API Response Interface
export interface PortfolioResponse {
  content: Portfolio[];
  hasNext: boolean;
  offset: number;
  pageSize: number;
}
export type PortfolioListApiResponse = ApiResponse<PortfolioResponse>;

//메인
// MainPortfolio 인터페이스는 Portfolio를 확장하여 score 추가
export interface MainPortfolio extends Portfolio {
  score: number; // 가중치 추가
}

// 메인 포트폴리오 응답 컨텐츠 인터페이스
export interface MainPortfolioContent {
  portfolioResponses: MainPortfolio[];
}

// 메인 포트폴리오 API 응답 타입
export type MainPortfolioResponse = ApiResponse<MainPortfolioContent>;

//포트폴리오 조회수 증가 API 응답 타입
export type PortfolioViewResponse = ApiResponse<boolean>;

//포트폴리오 좋아요 토글 API 응답 타입
export type PortfolioLikeResponse = ApiResponse<boolean>;

interface PortfolioLikeList {
  content: Portfolio[];
  hasNext: boolean;
  nextId: number;
}
export type PortfolioLikeListApiResponse = ApiResponse<PortfolioLikeList>;
export interface GetPortfolioLikeListParams {
  size?: number;
  portFolioId?: number | undefined;
}
