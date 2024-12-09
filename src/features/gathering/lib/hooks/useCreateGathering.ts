import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { gatheringApi } from '../../api/gathering.api';
import type { CreateGatheringRequest, CreateGatheringResponse } from '../../model/dto/request.dto';

import { errorAlert } from '@/shared/ui';
export const useCreateGathering = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<CreateGatheringResponse, AxiosError, CreateGatheringRequest>({
    mutationFn: gatheringApi.create,
    onSuccess: async response => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['gathering'] });

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
    onError: async (error: AxiosError) => {
      if (error.response?.status === 401) {
        await errorAlert({
          title: '로그인 필요',
          text: '로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.',
        });
        navigate('/login');
      } else if (error.response?.status === 403) {
        await errorAlert({
          title: '권한 없음',
          text: '권한이 없습니다. 로그인 후 다시 시도해주세요.',
        });
        navigate('/login');
      } else if (error.response?.status === 400) {
        await errorAlert({
          title: '입력값 오류',
          text: '입력값을 확인해주세요',
        });
      } else {
        console.error('게더링 생성 실패:', error);
        await errorAlert({
          title: '게더링 생성 실패',
          text: '게더링 생성에 실패했습니다.',
        });
      }
    },
  });
};
