import type { GatheringFilterOptions } from './types';

export const gatheringFilterOptions: GatheringFilterOptions = {
  processType: [
    { value: '온라인', label: '온라인' },
    { value: '오프라인', label: '오프라인' },
    { value: '온라인&오프라인', label: '온라인 & 오프라인' },
  ],
  category: [
    { value: '스터디', label: '스터디' },
    { value: '프로젝트', label: '프로젝트' },
    { value: '동아리', label: '동아리' },
    { value: '기타', label: '기타' },
  ],
  term: [
    { value: '1개월', label: '1개월' },
    { value: '3개월', label: '3개월' },
    { value: '6개월', label: '6개월' },
    { value: '6개월 이상', label: '6개월 이상' },
  ],
  recruitment: [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10명 이상', label: '10명 이상' },
  ],
  position: [
    { value: '개발자', label: '개발자' },
    { value: '디자이너', label: '디자이너' },
    { value: '기획자', label: '기획자' },
    { value: '마케터', label: '마케터' },
  ],
} as const;
