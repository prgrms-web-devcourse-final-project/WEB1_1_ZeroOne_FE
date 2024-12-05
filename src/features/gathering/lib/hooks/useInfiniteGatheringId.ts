import { useInfiniteQuery } from '@tanstack/react-query';

import { gatheringApi } from '../../api/gathering.api';
import type {
  GatheringListParams,
  GatheringPageResponse,
  GatheringSortType,
  GatheringPeriod,
  GatheringPosition,
  GatheringItem,
  GatheringPersonnel,
  GatheringContactType,
} from '../../model/dto/gathering.dto';

interface UseInfiniteGatheringIdProps {
  size?: number;
  sort?: GatheringSortType;
  subject?: string;
  period?: GatheringPeriod;
  positions?: GatheringPosition[];
  status?: '모집중' | '모집완료' | '기간만료';
  personnel?: GatheringPersonnel;
  contact?: GatheringContactType;
}

export const useInfiniteGatheringId = ({
  size = 10,
  sort,
  subject,
  period,
  positions,
  status,
  personnel,
  contact,
}: UseInfiniteGatheringIdProps = {}) => {
  const query = useInfiniteQuery({
    queryKey: ['gatheringList'],
    queryFn: async ({ pageParam }) => {
      const params: GatheringListParams = {
        page: 0,
        size,
        sort,
        subject,
        period,
        positions,
        status,
        personnel,
        contact,

        ...(pageParam ? { gatheringId: pageParam } : {}),
      };
      console.log('API Request:', params);

      const response = await gatheringApi.getGatherings(params);
      console.log('API Response:', response);
      return response;
    },
    getNextPageParam: (lastPage: GatheringPageResponse) => {
      // console.log('Getting next page param:', {
      //   hasNext: lastPage.data.hasNext,
      //   nextLikeId: lastPage.data.nextLikeId,
      // });

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
