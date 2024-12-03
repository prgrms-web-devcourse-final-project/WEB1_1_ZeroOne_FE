// useGatheringList.ts
import { gatheringApi } from '../../api/gathering.api';
import type { GatheringItem, GatheringPageResponse } from '../../model/dto/gathering.dto';

import { useCustomInfiniteQuery } from '@/shared/hook/useCustomInfiniteQuery';

export const useGatheringList = (status: '모집중' | '모집완료') => {
  return useCustomInfiniteQuery<GatheringPageResponse, GatheringItem, Error>(
    ['gatherings', status],
    ({ pageParam = 0 }) =>
      gatheringApi.getGatherings({
        status,
        pageable: {
          page: pageParam,
          size: 12,
          sort: ['createdAt,desc'], // 최신순 정렬
        },
      }),
    12,
    'content',
    true,
  );
};
