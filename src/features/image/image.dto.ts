import type { ApiResponse } from '@/shared/api';

export interface Images {
  imgUrls: { imgUrl: string }[];
}

export type PostImagesApiResponse = ApiResponse<Images>;
