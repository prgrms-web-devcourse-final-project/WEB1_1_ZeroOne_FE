import type { GatheringDetailResponse } from '../model/gathering.dto';
import type {
  GatheringItemDto,
  GatheringSortType,
  GatheringPeriod,
  GatheringPosition,
} from '../model/gathering.dto';

import api from '@/shared/api/baseApi';

interface GetGatheringsParams {
  sort?: GatheringSortType;
  period?: GatheringPeriod;
  position?: GatheringPosition;
  status?: '모집중' | '모집완료';
  size?: number;
  gatheringId?: number;
}

interface GetGatheringsParams {
  sort?: GatheringSortType;
  period?: GatheringPeriod;
  position?: GatheringPosition;
  status?: '모집중' | '모집완료';
  size?: number;
  nextLikeId?: number;
}

interface GatheringListResponse {
  data: {
    content: GatheringItemDto[];
    hasNext: boolean;
    nextLikeId: number;
  };
  timeStamp: string;
}

export const getGatheringList = {
  getGatherings: async (params: GetGatheringsParams): Promise<GatheringListResponse> => {
    const { data } = await api.get<GatheringListResponse>('/gathering', { params });
    return data;
  },
};
interface GatheringDetailApi {
  getGatheringById: (id: string) => Promise<GatheringDetailResponse>;
}

export const gatheringDetailApi: GatheringDetailApi = {
  getGatheringById: async (id: string) => {
    const { data } = await api.get<GatheringDetailResponse>(`/gathering/${id}`);
    return data;
  },
};
