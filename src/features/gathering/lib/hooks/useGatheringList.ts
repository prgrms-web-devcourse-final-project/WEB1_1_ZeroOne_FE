import { gatheringApi } from '../../api/gathering.api';
import type {
  GatheringItem,
  GatheringPageResponse,
  GatheringSortType,
  GatheringPeriod,
  GatheringPosition,
} from '../../model/dto/gathering.dto';

import { useCustomInfiniteQuery } from '@/shared/hook/useCustomInfiniteQuery';

interface GatheringListOptions {
  status?: '모집중' | '모집완료' | '기간만료';
  period?: GatheringPeriod;
  position?: GatheringPosition;
  pageSize?: number;
  sort?: GatheringSortType;
}

export const useGatheringList = ({
  status = '모집중',
  period,
  position,
  pageSize = 12,
  sort,
}: GatheringListOptions = {}) => {
  return useCustomInfiniteQuery<GatheringPageResponse, GatheringItem, Error>(
    ['gatherings', status, period, position, sort],
    ({ pageParam = 0 }) =>
      gatheringApi.getGatherings({
        page: pageParam,
        size: pageSize,
        sort,
        status,
        period,
        position,
      }),
    pageSize,
    'content',
    true,
  );
};
