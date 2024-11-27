import type { ObjectSchema } from 'yup';

export type Option = {
  value: string;
  label: string;
};

export interface FormValues {
  name: string;
  briefIntro: string;
  majorJobGroup: Option | null;
  minorJobGroup: Option | null;
  jobTitle: string;
  division: string;
  url: { value: string }[];
  imageUrl: string;
}

export type FormInputType = 'default' | 'radio' | 'select' | 'image' | 'textarea';
export type FormArrayInputType = 'array';
export type FormValuesName = keyof FormValues;
export type FormArrayInputKey = 'url';

export interface InputFieldProps {
  name: keyof FormValues;
  type?: FormInputType | FormArrayInputType;
  placeholder?: string;
  options?: Option[];
  maxLength?: number;
}

interface InputInfo extends InputFieldProps {
  label: string;
  required?: boolean;
}

interface FieldSetInfo {
  title: string;
  inputs: InputInfo[];
}

export interface FormConfigType {
  structure: FieldSetInfo[];
  validation: ObjectSchema<FormValues>;
}

export const JOB_CATEGORIES = [
  {
    label: '개발',
    value: 'DEVELOPER',
    children: [
      { label: '프론트엔드 개발자', value: 'FRONTEND' },
      { label: '서버/백엔드 개발자', value: 'BACKEND' },
      { label: '풀스택 개발자', value: 'FULL_STACK' },
      { label: '소프트웨어 엔지니어', value: 'SOFTWARE' },
      { label: 'Android 개발자', value: 'ANDROID' },
      { label: 'IOS 개발자', value: 'IOS' },
      { label: '크로스플랫폼 앱 개발자', value: 'CROSS_PLATFORM' },
      { label: 'DevOps 엔지니어', value: 'DEV_OPS' },
      { label: '시스템/네트워크 관리', value: 'SYSTEM' },
      { label: '머신러닝 엔지니어', value: 'MACHINE_LEARNING' },
      { label: 'QA 엔지니어', value: 'QA' },
      { label: '데이터 엔지니어', value: 'DATA_ENGINEER' },
      { label: '데이터 사이언티스트', value: 'DATA_SCIENCE' },
      { label: '보안 엔지니어', value: 'SECURITY' },
      { label: 'HW/임베디드 개발자', value: 'HW_EMBEDDED' },
      { label: '블록체인 엔지니어', value: 'BLOCK_CHAIN' },
      { label: 'DBA', value: 'DBA' },
      { label: '게임 개발자', value: 'GAME' },
      { label: '기타', value: 'ETC_DEV' },
    ],
  },
  {
    label: '기획',
    value: 'PROMOTER',
    children: [
      { label: 'PM ∘ PO', value: 'PM_PO' },
      { label: '서비스 기획자', value: 'SERVICE' },
      { label: '전략 기획자', value: 'STRATEGY' },
      { label: '사업개발 기획자', value: 'BUSINESS' },
      { label: '비즈니스 분석가', value: 'ANALYSIS' },
      { label: '상품 기획자/MD', value: 'MD' },
      { label: '다른 기획 분야', value: 'ETC_PROM' },
    ],
  },
  {
    label: '디자인',
    value: 'DESIGN',
    children: [
      { label: '일반 디자인', value: 'DESIGN' },
      { label: '인스퍼레이션', value: 'INSPIRATION' },
      { label: 'UI/UX', value: 'UI_UX' },
      { label: '코딩하는 디자이너', value: 'WITH_CODING' },
      { label: '브랜드 디자이너', value: 'BRAND' },
      { label: '타이포그래피', value: 'TYPO' },
      { label: '디자인 리소스', value: 'RESOURCE' },
    ],
  },
  {
    label: '마케팅',
    value: 'MARKETING',
    children: [
      { label: '일반 마케팅', value: 'MARKETING' },
      { label: '브랜드 마케팅', value: 'BRAND' },
      { label: '그로스 마케팅', value: 'GROWTH' },
      { label: '콘텐츠 마케팅', value: 'CONTENTS' },
      { label: '마케팅 인사이트', value: 'INSIGHT' },
    ],
  },
  {
    label: '기타',
    value: 'ETC',
    children: [
      { label: '서비스 업', value: 'SERVICE' },
      { label: '판매, 유통', value: 'DISTRIBUTION' },
      { label: '건설업', value: 'CONSTRUCT' },
      { label: '운전, 운송, 배송', value: 'DELIVERY' },
      { label: '교육업', value: 'EDUCATION' },
      { label: '은행, 금융업', value: 'FINANCE' },
      { label: '공공, 복지', value: 'WELFARE' },
      { label: '그 외', value: 'ETC' },
    ],
  },
];

export const JOB_DIVISION: Option[] = [
  { value: 'student', label: '학생' },
  { value: 'worker', label: '회사' },
  { value: 'etc', label: '기타' },
];
