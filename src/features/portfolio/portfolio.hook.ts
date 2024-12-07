import { useMutation } from '@tanstack/react-query';

import { postCreatePortfolio } from './portfolio.api';
import type { PostPortfolioDTO } from './portfolio.dto';

export const useCreatePortfolio = () => {
  return useMutation({
    mutationFn: ({ data }: { data: PostPortfolioDTO }) => postCreatePortfolio(data),
  });
};
