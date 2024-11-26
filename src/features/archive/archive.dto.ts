import type { ApiResponse } from '@/shared/api';

export interface PostArchiveRequestDTO {
  title: string;
  description: string;
  type: string;
  canComment: boolean;
  tags: { content: string }[];
  imageUrls: { url: string }[];
}

export interface PostArchiveResponseDTO {
  archiveId: number;
}

export type PostArchiveApiResponse = ApiResponse<PostArchiveResponseDTO>;
