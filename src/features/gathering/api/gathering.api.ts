import type { GatheringPageResponse, GatheringListParams } from '../model/dto/gathering.dto';
import type {
  GatheringDetailResponse,
  CreateGatheringRequest,
  CreateGatheringResponse,
} from '../model/dto/request.dto';

import api from '@/shared/api/baseApi';

export const gatheringApi = {
  getGatherings: async (params: GatheringListParams): Promise<GatheringPageResponse> => {
    const { data } = await api.get<GatheringPageResponse>('/gathering', { params });
    return data;
  },

  getGatheringDetail: async (id: string): Promise<GatheringDetailResponse> => {
    const { data } = await api.get<GatheringDetailResponse>(`/gathering/${id}`);
    return data;
  },

  create: async (requestData: CreateGatheringRequest): Promise<CreateGatheringResponse> => {
    const { data } = await api.post<CreateGatheringResponse>('/gathering', {
      ...requestData,
      gatheringImages: [], // 빈 배열로 설정
    });
    return data;
  },
};
