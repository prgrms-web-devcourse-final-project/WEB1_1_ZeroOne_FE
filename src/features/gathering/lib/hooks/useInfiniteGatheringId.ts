import { useInfiniteQuery } from '@tanstack/react-query';

import { gatheringApi } from '../../api/gathering.api';
import type {
  GatheringListParams,
  GatheringPageResponse,
  GatheringSortType,
  GatheringPeriod,
  GatheringPosition,
  GatheringItem,
} from '../../model/dto/gathering.dto';

interface UseInfiniteGatheringIdProps {
  size?: number;
  sort?: GatheringSortType;
  subject?: string;
  period?: GatheringPeriod;
  position?: GatheringPosition;
  status?: '모집중' | '모집완료' | '기간만료';
}

export const useInfiniteGatheringId = ({
  size = 10,
  sort,
  subject,
  period,
  position,
  status,
}: UseInfiniteGatheringIdProps = {}) => {
  const query = useInfiniteQuery({
    queryKey: ['gatheringList', size, sort, subject, period, position, status],
    queryFn: async ({ pageParam }) => {
      const params: GatheringListParams = {
        page: 0,
        size,
        sort,
        subject,
        period,
        position,
        status,
        ...(pageParam ? { gatheringId: pageParam } : {}),
      };

      const response = await gatheringApi.getGatherings(params);
      console.log('API Response:', response);
      return response;
    },
    getNextPageParam: (lastPage: GatheringPageResponse) => {
      console.log('Getting next page param:', {
        hasNext: lastPage.data.hasNext,
        nextLikeId: lastPage.data.nextLikeId,
      });

      if (!lastPage.data.hasNext) return undefined;
      return lastPage.data.nextLikeId ?? undefined;
    },
    initialPageParam: undefined,
  });

  // 중복 제거된 items 반환
  const items =
    query.data?.pages.reduce<GatheringItem[]>((acc, page) => {
      const newItems = page.data.content.filter(
        newItem => !acc.some(existingItem => existingItem.gatheringId === newItem.gatheringId),
      );
      return [...acc, ...newItems];
    }, []) ?? [];

  return {
    ...query,
    items,
  };
};
