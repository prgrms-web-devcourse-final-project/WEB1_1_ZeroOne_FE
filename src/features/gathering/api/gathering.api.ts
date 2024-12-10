import type {
  GatheringPageResponse,
  GatheringListParams,
  UserGatheringPageResponse,
} from '../model/dto/gathering.dto';
import type {
  GatheringDetailResponse,
  CreateGatheringRequest,
  CreateGatheringResponse,
  GatheringLikeResponse,
} from '../model/dto/request.dto';

import api from '@/shared/api/baseApi';

// 기본 게더링 API
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
  getUserGathering: (userId: number, nextGatheringId: number) =>
    api
      .get<UserGatheringPageResponse>(`/user/${userId}/gatherings`, {
        params: {
          ...(nextGatheringId && { nextGatheringId }),
          size: 8,
        },
      })
      .then(res => res.data),
  // 좋아요한 게더링 목록 조회 추가
  getGatheringLikeList: async (params: {
    size: number;
    gatheringId?: number;
  }): Promise<GatheringPageResponse> => {
    const queryString = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryString.append(key, value.toString());
      }
    });

    const { data } = await api.get<GatheringPageResponse>(
      `/gathering/my-page?${queryString.toString()}`,
    );
    return data;
  },
};

// 메인 페이지용 게더링 API
export const mainGatheringApi = {
  // 메인 페이지용 게더링 목록 조회 (최신 4개)
  getMainGatherings: async (): Promise<GatheringPageResponse> => {
    const params: GatheringListParams = {
      sort: '프로젝트',
      page: 0,
      size: 4,
      status: '모집중', // 활성화된 게더링만 표시
    };

    // params를 URLSearchParams로 변환
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== 'undefined') {
        queryString.append(key, value.toString());
      }
    });

    const { data } = await api.get<GatheringPageResponse>(`/gathering?${queryString.toString()}`);
    return data;
  },
};

// 두 API 객체를 모두 export
export default {
  ...gatheringApi,
  ...mainGatheringApi,
};
