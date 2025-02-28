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
        ...(sort && { sort }),
        ...(subject && { subject }),
        ...(period && { period }),
        ...(positions && { positions }),
        ...(status && { status }),
        ...(personnel && { personnel }),
        ...(contact && { contact }),
        ...(pageParam && { gatheringId: pageParam }),

        ...(pageParam ? { gatheringId: pageParam } : {}),
      };
      

      const response = await gatheringApi.getGatherings(params);
      
      return response;
    },
    getNextPageParam: (lastPage: GatheringPageResponse) => {
      

      if (!lastPage.data.hasNext) return undefined;
      return lastPage.data.nextId ?? undefined;
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
