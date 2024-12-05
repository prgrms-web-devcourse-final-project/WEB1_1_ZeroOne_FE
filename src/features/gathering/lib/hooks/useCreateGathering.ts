import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { gatheringApi } from '../../api/gathering.api';
import type { CreateGatheringRequest, CreateGatheringResponse } from '../../model/dto/request.dto';

export const useCreateGathering = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<CreateGatheringResponse, AxiosError, CreateGatheringRequest>({
    mutationFn: gatheringApi.create,
    onSuccess: async response => {
      try {
        // gatherings 쿼리를 무효화하여 리스트가 새로고침되도록 함
        await queryClient.invalidateQueries({ queryKey: ['gathering'] });

        // 생성된 게더링 상세 페이지로 이동
        const gatheringId = response.data?.gatheringId;
        if (gatheringId) {
          navigate(`/gathering/${gatheringId}`);
        } else {
          console.error('No gathering ID in response');
          alert('게더링이 생성되었으나 상세 페이지로 이동할 수 없습니다.');
        }
      } catch (error) {
        console.error('게더링 생성 후 처리 중 오류 발생:', error);
        alert('게더링은 생성되었으나 추가 처리 중 오류가 발생했습니다.');
      }
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
        navigate('/login');
      } else if (error.response?.status === 403) {
        alert('권한이 부족합니다. 다시 로그인해주세요.');
        navigate('/login');
      } else if (error.response?.status === 400) {
        alert('입력하신 정보를 다시 확인해주세요.');
      } else {
        console.error('게더링 생성 실패:', error);
        alert('게더링 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });
};
