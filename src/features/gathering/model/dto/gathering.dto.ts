export type GatheringContactType = '온라인' | '오프라인' | '온라인&오프라인';
export type GatheringSortType = '스터디' | '프로젝트' | '동아리' | '기타';
export type GatheringPeriod = '1개월' | '3개월' | '6개월' | '6개월 이상';
export type GatheringPersonnel = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10명 이상';
export type GatheringPosition = '개발자' | '디자이너' | '기획자' | '마케터';

export type StudySubjectType = '개발' | '디자인' | '어학' | '기타';
export type ProjectSubjectType = '개발' | '디자인' | '기획' | '마케팅' | '기타';
export type ClubSubjectType = '취미' | '운동' | '음악' | '기타';
export type EtcSubjectType = '기타';

export type GatheringSubjectMap = {
  스터디: StudySubjectType;
  프로젝트: ProjectSubjectType;
  동아리: ClubSubjectType;
  기타: EtcSubjectType;
};

export interface CreateGatheringRequest {
  sort: string;
  subject: string;
  contact: string;
  personnel: string;
  period: string;
  position: string[];
  title: string;
  deadLine: string;
  gatheringTag: string[];
  url: string;
  content: string;
  gatheringImages: string[];
}

export interface GatheringItem {
  gatheringId: number;
  userId: number;
  sort: GatheringSortType;
  title: string;
  deadLine: string;
  username: string;
  tags: string[];
}

export interface PageableSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: PageableSort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

export interface GatheringPageResponse {
  size: number;
  content: GatheringItem[];
  number: number;
  sort: PageableSort;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

//리스트 관련
export interface SortStatus {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: SortStatus;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

export interface GatheringItem {
  gatheringId: number;
  userId: number;
  sort: GatheringSortType;
  title: string;
  deadLine: string;
  username: string;
  tags: string[];
}

export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableInfo {
  offset: number;
  sort: SortInfo;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

export interface GatheringPageResponse {
  size: number;
  content: GatheringItem[];
  number: number;
  sort: SortInfo;
  pageable: PageableInfo;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// API 요청 파라미터 타입
export interface GatheringListParams {
  // page?: number;
  // size?: number;
  sort?: string;
  status?: string;
  period?: string;
  position?: string;
  gatheringId?: number;
}
