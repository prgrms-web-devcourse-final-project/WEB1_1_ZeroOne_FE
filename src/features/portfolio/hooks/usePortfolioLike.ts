import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { togglePortfolioLike } from '../api/portfolio.api';

interface UsePortfolioLikeProps {
  portFolioId: string | number;
  initialIsLiked?: boolean;
}

export const usePortfolioLike = ({
  portFolioId,
  initialIsLiked = false,
}: UsePortfolioLikeProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: () => togglePortfolioLike(portFolioId),
    onMutate: () => {
      // 옵티미스틱 업데이트
      setIsLiked(prev => !prev);
    },
    onError: error => {
      // 실패시 원래 상태로 복구
      setIsLiked(prev => !prev);
      console.error('좋아요 처리 실패:', error);
    },
  });

  return {
    isLiked,
    toggleLike,
    isPending,
  };
};
