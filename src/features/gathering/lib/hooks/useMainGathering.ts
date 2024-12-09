import { useQuery } from '@tanstack/react-query';

import { mainGatheringApi } from '../../api/gathering.api';

export const useMainGathering = () => {
  const query = useQuery({
    queryKey: ['mainGatheringList'],
    queryFn: async () => {
      const response = await mainGatheringApi.getMainGatherings();
      return response;
    },
  });

  // items 배열 추출
  const items = query.data?.data.content ?? [];

  return {
    ...query,
    items,
  };
};
