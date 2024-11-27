export interface JoinProgressStage {
  stage: number;
  name: string;
}

export const JOIN_STAGES: JoinProgressStage[] = [
  {
    stage: 1,
    name: '프로필 입력',
  },
  { stage: 2, name: '포트폴리오 연결' },
  {
    stage: 3,
    name: '나의 색상 추천받기',
  },
];
