import type { GatheringPageResponse, GatheringListParams } from '../model/dto/gathering.dto';
import type {
  GatheringDetailResponse,
  CreateGatheringRequest,
  CreateGatheringResponse,
  GatheringLikeResponse,
} from '../model/dto/request.dto';

import api from '@/shared/api/baseApi';

export const gatheringApi = {
  getGatherings: async (params: GatheringListParams): Promise<GatheringPageResponse> => {
    // params를 URLSearchParams로 변환
    const queryString = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== 'undefined') {
        if (key === 'positions' && Array.isArray(value)) {
          value.forEach(pos => {
            queryString.append('positions', pos);
          });
        } else {
          queryString.append(key, value.toString());
        }
      }
    });

    const { data } = await api.get<GatheringPageResponse>(`/gathering?${queryString.toString()}`);
    return data;
  },

  getGatheringDetail: async (id: string): Promise<GatheringDetailResponse> => {
    const { data } = await api.get<GatheringDetailResponse>(`/gathering/${id}`);
    return data;
  },

  create: async (requestData: CreateGatheringRequest): Promise<CreateGatheringResponse> => {
    const { data } = await api.post<CreateGatheringResponse>('/gathering', {
      ...requestData,
      gatheringImages: [],
    });
    return data;
  },
  update: async (
    gatheringId: string,
    data: CreateGatheringRequest,
  ): Promise<CreateGatheringResponse> => {
    const response = await api.put<CreateGatheringResponse>(`/gathering/${gatheringId}`, data);
    return response.data;
  },

  toggleLike: async (gatheringId: string): Promise<GatheringLikeResponse> => {
    const { data } = await api.post<GatheringLikeResponse>(`/gathering/${gatheringId}/like`);
    return data;
  },
  deleteGathering: async (gatheringId: string): Promise<void> => {
    await api.delete(`/gathering/${gatheringId}`);
  },
  completeGathering: async (gatheringId: string): Promise<void> => {
    await api.patch(`/gathering/${gatheringId}`);
  },
};
