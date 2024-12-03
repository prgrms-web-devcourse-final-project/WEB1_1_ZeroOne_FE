import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { gatheringApi } from '../../api/gathering.api';
import type { GatheringDetailResponse } from '../../model/dto/request.dto';

export const useGatheringDetail = (id: string) => {
  return useQuery<GatheringDetailResponse, AxiosError>({
    queryKey: ['/gathering', id],
    queryFn: () => gatheringApi.getGatheringById(id),
    enabled: !!id,
  });
};
