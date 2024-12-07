import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { gatheringApi } from '../../api/gathering.api';

interface UseDeleteGatheringProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useDeleteGathering = ({ onSuccess, onError }: UseDeleteGatheringProps = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (gatheringId: string) => gatheringApi.deleteGathering(gatheringId),
    onSuccess: async () => {
      // 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: ['/gatheringDetail'] });
      // 성공 콜백
      onSuccess?.();
      // 목록 페이지로 이동
      navigate('/gathering');
    },
    onError,
  });
};
