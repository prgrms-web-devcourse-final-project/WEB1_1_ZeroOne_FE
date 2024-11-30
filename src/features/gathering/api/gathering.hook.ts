import { useQuery } from '@tanstack/react-query';

import { getGatheringList } from '../api/gathering.api';
import { gatheringDetailApi } from '../api/gathering.api';
import type { GatheringDetailResponse } from '../model/gathering.dto';
import type {
  GatheringItemDto,
  // GatheringResponseDto,
  GatheringSortType,
  GatheringPeriod,
  GatheringPosition,
} from '../model/gathering.dto';

import { useCustomInfiniteQuery } from '@/shared/hook/useCustomInfiniteQuery';

interface TransformedGatheringResponse {
  data: GatheringItemDto[];
}

export const useGatheringList = (
  status: '모집중' | '모집완료',
  sort?: GatheringSortType,
  period?: GatheringPeriod,
  position?: GatheringPosition,
) => {
  return useCustomInfiniteQuery<TransformedGatheringResponse, GatheringItemDto, Error>(
    ['gatherings', sort ?? '', period ?? '', position ?? '', status],
    async ({ pageParam }) => {
      const response = await getGatheringList.getGatherings({
        sort,
        period,
        position,
        status,
        size: 9,
        nextLikeId: pageParam || undefined,
      });

      // API 응답을 useCustomInfiniteQuery가 기대하는 형태로 변환
      return {
        data: response.data.content,
      };
    },
    9,
    true,
  );
};

export const useGatheringDetail = (gatheringId: string) => {
  const { data, isLoading, isError, error } = useQuery<GatheringDetailResponse, Error>({
    queryKey: ['gathering', 'detail', gatheringId],
    queryFn: () => gatheringDetailApi.getGatheringById(gatheringId),
    enabled: !!gatheringId,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  return {
    gathering: data?.data,
    isLoading,
    isError,
    error,
  };
};
