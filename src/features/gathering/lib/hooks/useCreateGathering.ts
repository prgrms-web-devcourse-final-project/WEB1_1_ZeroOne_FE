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
        await queryClient.invalidateQueries({ queryKey: ['/gathering/create'] });
        navigate(`/gathering/${response.data?.gatheringId}`);
      } catch (error) {
        console.error('Error after gathering creation:', error);
      }
    },
    onError: error => {
      if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
        navigate('/login');
      } else {
        alert('게더링 생성에 실패했습니다.');
      }
    },
  });
};
