import { useInfiniteQuery } from '@tanstack/react-query';

import { gatheringApi } from '../../api/gathering.api';
import type { GatheringPageResponse, GatheringItem } from '../../model/dto/gathering.dto';

interface UseGatheringLikeListProps {
  size?: number;
}

interface GatheringLikeListParams {
  size: number;
  likeId: number;
}

export const useGatheringLikeList = ({ size = 10 }: UseGatheringLikeListProps = {}) => {
  const query = useInfiniteQuery<GatheringPageResponse>({
    queryKey: ['infiniteLikeGatherings'],
    queryFn: async ({ pageParam }) => {
      const params: GatheringLikeListParams = {
        size,
        likeId: pageParam,
      };

      return gatheringApi.getGatheringLikeList(params);
    },
    getNextPageParam: lastPage => {
      if (!lastPage?.data?.hasNext) return undefined;
      return lastPage?.data.nextId ?? undefined;
    },
    initialPageParam: undefined,
  });

  const gatherings =
    query.data?.pages?.reduce<GatheringItem[]>((acc, page) => {
      const content = page.data?.content || [];

      const newGatherings = content.filter(
        newGathering =>
          !acc.some(
            existingGathering => existingGathering.gatheringId === newGathering.gatheringId,
          ),
      );

      return [...acc, ...newGatherings];
    }, []) ?? [];

  return {
    ...query,
    gatherings,
  };
};
