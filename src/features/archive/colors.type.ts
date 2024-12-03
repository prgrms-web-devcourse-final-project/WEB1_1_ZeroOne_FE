export type Color = 'RED' | 'YELLOW' | 'BLUE' | 'GREEN' | 'PURPLE' | 'DEFAULT';

export interface ColorInfo {
  label: string;
  name: string;
  description: string;
  tag: string;
  hex: string;
}

export interface ColorGroup {
  group: string;
  colors: Color[];
}

export const ColorData: ColorGroup[] = [
  {
    group: 'one',
    colors: ['RED', 'YELLOW', 'BLUE'],
  },
  {
    group: 'two',
    colors: ['GREEN', 'PURPLE'],
  },
];

export const ColorMap: { [key in Color]: ColorInfo } = {
  RED: {
    label: 'red',
    name: '빨강',
    description: '추진력이 돋보이는 기록',
    tag: '#주도적인 리더십 #적극적인 행동력',
    hex: '#ff5e5e',
  },
  YELLOW: {
    label: 'yellow',
    name: '노랑',
    description: '창의력이 돋보이는 기록',
    tag: '#창의적인 아이디어 #자유로운 발상',
    hex: '#ffe66b',
  },
  BLUE: {
    label: 'blue',
    name: '파랑',
    description: '분석력이 돋보이는 기록',
    tag: '#논리적 사고 #깊이 있는 연구',
    hex: '#8ad0e2',
  },
  GREEN: {
    label: 'green',
    name: '초록',
    description: '헌신했던 경험이 돋보이는 기록',
    tag: '#타인을 위한 봉사 #공동체 기여',
    hex: '#b5d681',
  },
  PURPLE: {
    label: 'purple',
    name: '보라',
    description: '성찰력이 돋보이는 기록',
    tag: '#내적 동기 탐구 #가치관 형성',
    hex: '#aa8abd',
  },
  DEFAULT: {
    label: 'default',
    name: '기본',
    description: '기본 색상',
    tag: '#기본 색상',
    hex: '#333533',
  },
};
