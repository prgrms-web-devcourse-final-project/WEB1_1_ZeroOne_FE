import type { ApiResponse } from '@/shared/api';

export interface TokenResponse {
  message: string;
  expiresIn: number;
}

export type TokenApiResponse = ApiResponse<TokenResponse>;
