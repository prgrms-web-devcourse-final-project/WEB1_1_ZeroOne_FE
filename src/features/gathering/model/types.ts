export type GatheringProcessType = '온라인' | '오프라인' | '온라인&오프라인';
export type GatheringCategory = '스터디' | '프로젝트' | '동아리' | '기타';
export type GatheringTerm = '1개월' | '3개월' | '6개월' | '6개월 이상';
export type GatheringRecruitment =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10명 이상';
export type GatheringPosition = '개발자' | '디자이너' | '기획자' | '마케터';

export interface SelectOption<T> {
  value: T;
  label: string;
}

export interface GatheringFilterOptions {
  processType: SelectOption<GatheringProcessType>[];
  category: SelectOption<GatheringCategory>[];
  term: SelectOption<GatheringTerm>[];
  recruitment: SelectOption<GatheringRecruitment>[];
  position: SelectOption<GatheringPosition>[];
}
