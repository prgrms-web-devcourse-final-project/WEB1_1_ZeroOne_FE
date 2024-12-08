import { useMutation, useQueryClient } from '@tanstack/react-query';

import { gatheringApi } from '../../api/gathering.api';

interface UseCompleteGatheringProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useCompleteGathering = ({ onSuccess, onError }: UseCompleteGatheringProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gatheringId: string) => gatheringApi.completeGathering(gatheringId),

    onSuccess: async () => {
      // 관련 쿼리 무효화
      await queryClient.invalidateQueries({ queryKey: ['/gatheringDetail'] });
      onSuccess?.();
    },

    onError,
  });
};
