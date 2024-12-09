import { useMutation, useQueryClient } from '@tanstack/react-query';

import { gatheringApi } from '../../api/gathering.api';
import type { GatheringLikeResponse, GatheringDetailResponse } from '../../model/dto/request.dto';

interface UseGatheringLikeProps {
  gatheringId: string;
  onSuccess?: (response: GatheringLikeResponse) => void;
  onError?: (error: unknown) => void;
}

interface MutationContext {
  previousDetail: GatheringDetailResponse | undefined;
}

export const useGatheringLike = ({ gatheringId, onSuccess, onError }: UseGatheringLikeProps) => {
  const queryClient = useQueryClient();

  return useMutation<GatheringLikeResponse, Error, void, MutationContext>({
    mutationFn: () => gatheringApi.toggleLike(gatheringId),

    onMutate: async () => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({
        queryKey: ['/gatheringDetail', gatheringId],
      });

      
      const previousDetail = queryClient.getQueryData<GatheringDetailResponse>([
        '/gatheringDetail',
        gatheringId,
      ]);

      
      if (previousDetail?.data) {
        queryClient.setQueryData<GatheringDetailResponse>(['/gatheringDetail', gatheringId], {
          ...previousDetail,
          data: {
            ...previousDetail.data,
            isLiked: !previousDetail.data.isLiked,
          },
        });
      }

      return { previousDetail };
    },

    onSuccess: response => {
      const currentDetail = queryClient.getQueryData<GatheringDetailResponse>([
        '/gatheringDetail',
        gatheringId,
      ]);

      if (currentDetail?.data) {
        const newLikeCounts = response.data
          ? currentDetail.data.likeCounts + 1
          : Math.max(0, currentDetail.data.likeCounts - 1);

        queryClient.setQueryData<GatheringDetailResponse>(['/gatheringDetail', gatheringId], {
          ...currentDetail,
          data: {
            ...currentDetail.data,
            likeCounts: newLikeCounts,
            isLiked: !!response.data,
          },
        });
      }

      onSuccess?.(response);
    },

    onError: (error, _, context) => {
    
      if (context?.previousDetail) {
        queryClient.setQueryData(['/gatheringDetail', gatheringId], context.previousDetail);
      }
      onError?.(error);
    },
  });
};
