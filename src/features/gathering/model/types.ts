export type GatheringContactType = '온라인' | '오프라인' | '온라인&오프라인';
export type GatheringSortType = '스터디' | '프로젝트' | '동아리' | '기타';
export type GatheringSubjectType = '개발' | '디자인' | '기획' | '마케팅';
export type GatheringPeriod = '1개월' | '3개월' | '6개월' | '6개월 이상';
export type GatheringPersonnel = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10명 이상';
export type GatheringPosition = '개발자' | '디자이너' | '기획자' | '마케터';

export type SelectOption = {
  value: string;
  label: string;
};

export interface GatheringFormData {
  contact: string;
  sort: string;
  subject: string;
  period: string;
  personnel: string;
  position: string[];
  gatheringTag: string[];
  title: string;
  url: string;
  content: string;
  deadLine: string ;
}

export interface GatheringFilterOptions {
  contact: SelectOption[];
  sort: SelectOption[];
  period: SelectOption[];
  personnel: SelectOption[];
  position: SelectOption[];
  subject: {
    project: SelectOption[];
    study: SelectOption[];
    club: SelectOption[];
    etc: SelectOption[];
  };
}
