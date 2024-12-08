export type GatheringContactType = '온라인' | '오프라인' | '온라인&오프라인';
export type GatheringSortType = '스터디' | '프로젝트' | '동아리' | '기타';
export type GatheringPeriod = '1개월' | '3개월' | '6개월' | '6개월 이상';
export type GatheringPosition = '개발자' | '디자이너' | '기획자' | '마케터';
export type GatheringPersonnel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
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
  personnel: number;
  period: string;
  positions: string[];
  title: string;
  deadLine: string;
  gatheringTag: string[];
  url: string;
  content: string;
  gatheringImages: string[];
}

//확정
export interface GatheringItem {
  gatheringId: number;
  userId: number;
  sort: GatheringSortType;
  title: string;
  deadLine: string;
  username: string;
  tags: string[];
  positions: GatheringPosition[];
  subject: string;
}
export interface GatheringPageResponse {
  data: {
    content: GatheringItem[];
    hasNext: boolean;
    nextId: number | null;
  };
  timeStamp: string;
}
export interface GatheringListParams {
  page: number;
  size: number;
  sort?: GatheringSortType;
  subject?: string;
  period?: GatheringPeriod;
  positions?: GatheringPosition[];
  status?: '모집중' | '모집완료' | '기간만료';
  gatheringId?: number;
  personnel?: GatheringPersonnel;
  contact?: GatheringContactType;
}
//
