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

interface FormConfig {
  structure: FieldSetInfo[];
}

export const JOB_CATEGORIES = {
  '개발(DEVELOPER)': [
    '프론트엔드 개발자(FRONTEND)',
    '서버/백엔드 개발자(BACKEND)',
    '풀스택 개발자(FULL_STACK)',
    '소프트웨어 엔지니어(SOFTWARE)',
    'Android 개발자(ANDROID)',
    'IOS 개발자(IOS)',
    '크로스플랫폼 앱 개발자(CROSS_PLATFORM)',
    'DevOps 엔지니어(DEV_OPS)',
    '시스템/네트워크 관리(SYSTEM)',
    '머신러닝 엔지니어(MACHINE_LEARNING)',
    'QA 엔지니어(QA)',
    '데이터 엔지니어(DATA_ENGINEER)',
    '데이터 사이언티스트(DATA_SCIENCE)',
    '보안 엔지니어(SECURITY)',
    'HW/임베디드 개발자(HW_EMBEDDED)',
    '블록체인 엔지니어(BLOCK_CHAIN)',
    'DBA(DBA)',
    '게임 개발자(GAME)',
    '기타(ETC_DEV)',
  ],
  '기획(PROMOTER)': [
    'PM ∘ PO(PM_PO)',
    '서비스 기획자(SERVICE)',
    '전략 기획자(STRATEGY)',
    '사업개발 기획자(BUSINESS)',
    '비즈니스 분석가(ANALYSIS)',
    '상품 기획자/MD(MD)',
    '다른 기획 분야(ETC_PROM)',
  ],
  '디자인(DESIGN)': [
    '일반 디자인(DESIGN)',
    '인스퍼레이션(INSPIRATION)',
    'UI/UX(UI_UX)',
    '코딩하는 디자이너(WITH_CODING)',
    '브랜드 디자이너(BRAND)',
    '타이포그래피(TYPO)',
    '디자인 리소스(RESOURCE)',
  ],
  '마케팅(MARKETING)': [
    '일반 마케팅(MARKETING)',
    '브랜드 마케팅(BRAND)',
    '그로스 마케팅(GROWTH)',
    '콘텐츠 마케팅(CONTENTS)',
    '마케팅 인사이트(INSIGHT)',
  ],
  '기타(ETC)': [
    '서비스 업(SERVICE)',
    '판매, 유통(DISTRIBUTION)',
    '건설업(CONSTRUCT)',
    '운전, 운송, 배송(DELIVERY)',
    '교육업(EDUCATION)',
    '은행, 금융업(FINANCE)',
    '공공, 복지(WELFARE)',
    '그 외(ETC)',
  ],
} as const;

export type MajorJobType = keyof typeof JOB_CATEGORIES;

const JOB_DIVISION: Option[] = [
  { value: 'student', label: '학생' },
  { value: 'worker', label: '회사' },
  { value: 'etc', label: '기타' },
];

export const FORM_CONFIG: FormConfig = {
  structure: [
    {
      title: '기본 정보',
      inputs: [
        {
          label: '프로필 사진',
          type: 'image',
          name: 'imageUrl',
        },
        {
          label: '이름',
          type: 'default',
          name: 'name',
          required: true,
          placeholder: '이름을 입력해주세요.',
        },
        {
          label: '한 줄 소개',
          type: 'textarea',
          name: 'briefIntro',
          maxLength: 100,
          placeholder: '한 줄 소개를 입력해주세요.',
        },
      ],
    },
    {
      title: '커리어 정보',
      inputs: [
        {
          label: '분야',
          type: 'select',
          name: 'majorJobGroup',
          options: Object.keys(JOB_CATEGORIES).map(category => ({
            value: category,
            label: category,
          })),
          placeholder: '분야를 골라주세요.',
        },
        {
          label: '직무',
          type: 'select',
          name: 'minorJobGroup',
          placeholder: '분야를 먼저 선택해 주세요.',
        },
        {
          label: '소속',
          type: 'radio',
          name: 'division',
          options: JOB_DIVISION,
        },
        {
          label: '소속명',
          type: 'default',
          name: 'jobTitle',
          placeholder: '소속명을 입력해주세요.',
        },
      ],
    },
    {
      title: 'URL',
      inputs: [
        {
          label: 'URL',
          type: 'array',
          name: 'url',
          placeholder: 'https://',
        },
      ],
    },
  ],
};
