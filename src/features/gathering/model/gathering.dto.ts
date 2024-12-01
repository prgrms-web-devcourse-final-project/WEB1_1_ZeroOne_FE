export type GatheringContactType = '온라인' | '오프라인' | '온라인&오프라인';
export type GatheringSortType = '스터디' | '프로젝트' | '동아리' | '기타';
export type GatheringPeriod = '1개월' | '3개월' | '6개월' | '6개월 이상';
export type GatheringPersonnel = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10명 이상';
export type GatheringPosition = '개발자' | '디자이너' | '기획자' | '마케터';

export type StudySubjectType = '개발' | '디자인' | '어학' | '기타';
export type ProjectSubjectType = '개발' | '디자인' | '기획' | '마케팅' | '기타';
export type ClubSubjectType = '취미' | '운동' | '음악' | '기타';
export type EtcSubjectType = '기타';

// sort에 따른 subject를 매핑하는 타입
export type GatheringSubjectMap = {
  스터디: StudySubjectType;
  프로젝트: ProjectSubjectType;
  동아리: ClubSubjectType;
  기타: EtcSubjectType;
};

export interface GatheringResponseDto {
  data: {
    content: GatheringItemDto[];
    hasNext: boolean;
    nextLikeId: number;
  };
  timeStamp: string;
}

// 폼데이터 이거로 바꿀 것입니다.
export interface GatheringItemDto<T extends GatheringSortType = GatheringSortType> {
  gatheringId: string;
  userId: string;
  contactType: GatheringContactType;
  sort: T;
  subject: GatheringSubjectMap[T];
  period: GatheringPeriod;
  personnel: GatheringPersonnel;
  position: GatheringPosition[];
  title: string;
  deadLine: string;
  username: string;
  tags: string[];
}

export interface GatheringDetailResponseDto<T extends GatheringSortType = GatheringSortType> {
  data: {
    sort: T;
    username: string;
    createTime: string;
    subject: GatheringSubjectMap[T];
    contact: GatheringContactType;
    personnel: GatheringPersonnel;
    period: GatheringPeriod;
    deadLine: string;
    position: GatheringPosition[];
    gatheringTag: string[];
    contactUrl: string;
    title: string;
    content: string;
  };
  timeStamp: string;
}
export interface GatheringDetailResponse {
  data: {
    sort: GatheringSortType;
    username: string;
    createTime: string;
    subject: string;
    contact: GatheringContactType;
    personnel: number;
    period: GatheringPeriod;
    deadLine: string;
    position: string;
    gatheringTag: string[];
    contactUrl: string;
    title: string;
    content: string;
  };
  timeStamp: string;
}
