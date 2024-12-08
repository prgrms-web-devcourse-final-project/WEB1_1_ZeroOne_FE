import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { gatheringApi } from '../../api/gathering.api';
import type { GatheringDetailResponse } from '../../model/dto/request.dto';

export const useGatheringDetail = (gatheringId: string) => {
  return useQuery<GatheringDetailResponse, AxiosError>({
    queryKey: ['/gatheringDetail', gatheringId],
    queryFn: () => gatheringApi.getGatheringDetail(gatheringId),
    enabled: !!gatheringId,
  });
};
