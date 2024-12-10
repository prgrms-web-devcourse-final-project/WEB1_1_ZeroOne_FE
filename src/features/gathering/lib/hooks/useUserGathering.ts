import { gatheringApi } from '../../api/gathering.api';
import type { GatheringItem, UserGatheringPageResponse } from '../../model';

import { useCustomInfiniteQuery } from '@/shared/hook';

export const useUserGathering = (userId: number) =>
  useCustomInfiniteQuery<UserGatheringPageResponse, GatheringItem, Error>(
    ['/user', userId, 'gathering', 'list'],
    ({ pageParam }) => gatheringApi.getUserGathering(userId, pageParam),
    'gatherings',
    lastPage => {
      if (!lastPage.data.hasNext) {
        return undefined;
      }
      return lastPage.data.nextLikeId ?? undefined;
    },
    true,
  );
