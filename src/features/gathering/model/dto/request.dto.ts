import type {
  GatheringSortType,
  GatheringPeriod,
  GatheringPosition,
  GatheringContactType,
} from './gathering.dto';

import type { ApiResponse } from '@/shared/api/api.dto';

// 게더링 생성
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

// 게더링 목록 조회 응답
interface GatheringListContent {
  content: GatheringDetailContent[];
  hasNext: boolean;
  nextLikeId: number;
}

export type GatheringListResponse = ApiResponse<GatheringListContent>;

export interface GetGatheringsParams {
  sort?: GatheringSortType;
  period?: GatheringPeriod;
  position?: GatheringPosition;
  status?: '모집중' | '모집완료';
  size?: number;
  nextLikeId?: number;
}

// 게더링 상세 조회 응답
export interface GatheringDetailContent {
  sort: GatheringSortType;
  userId: number;
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
}

// response
// 게더링 생성 응답
interface CreateGatheringContent {
  gatheringId: number;
}

export type CreateGatheringResponse = ApiResponse<CreateGatheringContent>;
export type GatheringDetailResponse = ApiResponse<GatheringDetailContent>;
