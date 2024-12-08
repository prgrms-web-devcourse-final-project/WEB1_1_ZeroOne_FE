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
      await queryClient.cancelQueries({
        queryKey: ['/gatheringDetail', gatheringId],
      });

      const previousDetail = queryClient.getQueryData<GatheringDetailResponse>([
        '/gatheringDetail',
        gatheringId,
      ]);

      console.log('이전 상태:', previousDetail);
      return { previousDetail };
    },

    onSuccess: response => {
      console.log('좋아요 API 응답:', response);

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
          },
        });

        console.log('캐시 업데이트 완료, 새로운 좋아요 수:', newLikeCounts);
      }

      onSuccess?.(response);
    },

    onError: (error, _, context) => {
      console.log('에러 발생:', error);

      if (context?.previousDetail) {
        queryClient.setQueryData(['/gatheringDetail', gatheringId], context.previousDetail);
      }
      onError?.(error);
    },
  });
};
