import type { PostPortfolioApiResponse, PostPortfolioDTO } from './portfolio.dto';

import api from '@/shared/api/baseApi';

export const postCreatePortfolio = (data: PostPortfolioDTO) =>
  api.post<PostPortfolioApiResponse>('/portfolio', data).then(res => res.data);
