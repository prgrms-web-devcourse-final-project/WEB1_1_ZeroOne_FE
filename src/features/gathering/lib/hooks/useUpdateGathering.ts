import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { gatheringApi } from '../../api/gathering.api';
import type { CreateGatheringRequest } from '../../model';
export const useUpdateGathering = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ gatheringId, data }: { gatheringId: string; data: CreateGatheringRequest }) =>
      gatheringApi.update(gatheringId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/gatheringDetail'] }).catch(error => {
        console.error('Error invalidating queries:', error);
      });
      navigate('/gathering');
    },
  });
};
