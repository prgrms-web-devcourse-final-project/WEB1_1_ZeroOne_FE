import type { GatheringPageResponse } from '../model/dto/gathering.dto';
import type {
  // GetGatheringsParams,
  // GatheringListResponse,
  GatheringDetailResponse,
  CreateGatheringRequest,
  CreateGatheringResponse,
  GatheringListParams,
} from '../model/dto/request.dto';
//게더링 관련 모든 API 호출을 담당하는 파일

import api from '@/shared/api/baseApi';

export const gatheringApi = {
  getGatherings: async (params: GatheringListParams): Promise<GatheringPageResponse> => {
    const { data } = await api.get<GatheringPageResponse>('/gathering', { params });
    return data;
  },

  getGatheringById: async (id: string): Promise<GatheringDetailResponse> => {
    const { data } = await api.get<GatheringDetailResponse>(`/gathering/${id}`);
    return data;
  },

  create: async (data: CreateGatheringRequest): Promise<CreateGatheringResponse> => {
    const { data: response } = await api.post<CreateGatheringResponse>('/gathering', data);
    return response;
  },
};
