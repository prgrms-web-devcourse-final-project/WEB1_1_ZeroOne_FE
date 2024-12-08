import { useMutation } from '@tanstack/react-query';

import { incrementViewCount } from '../api/portfolio.api';
import type { PortfolioViewResponse } from '../model/types';

interface UsePortfolioViewProps {
  onSuccess?: (response: PortfolioViewResponse) => void;
  onError?: (error: unknown) => void;
}

export const usePortfolioView = ({ onSuccess, onError }: UsePortfolioViewProps = {}) => {
  return useMutation({
    mutationFn: (portfolioId: string | number) => incrementViewCount(portfolioId),
    onSuccess,
    onError,
  });
};
