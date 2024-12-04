import type { PostUserResponseDTO } from '../user/user.dto';

import type { ApiResponse } from '@/shared/api';

export interface PostPortfolioDTO {
  portfolioURL: string;
}

export type PostPortfolioApiResponse = ApiResponse<PostUserResponseDTO>;
