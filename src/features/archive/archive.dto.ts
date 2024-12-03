import type { Color } from './colors.type';

import type { ApiResponse } from '@/shared/api';

export interface BaseArchiveDTO {
  title: string;
  description: string;
  introduction: string;
  type: Color;
  canComment: boolean;
  tags: { content: string }[];
  imageUrls: { url: string }[];
}

export interface Archive extends BaseArchiveDTO {
  username: string;
  job: string;
  likeCount: number;
  commentCount: number;
  hits: number;
  isMine: boolean;
  userProfile: string;
}

export interface ArchiveCardDTO {
  archiveId: number;
  title: string;
  introduction: string;
  type: Color;
  likeCount: number;
  username: string;
  thumbnail: string;
  createDate: Date;
  isLiked: boolean;
}

export interface Comment {
  commentId: number;
  content: string;
  username: string;
  isMine: boolean;
  userProfile: string;
}

export interface PostCommentResponseDTO {
  commentId: number;
}

export interface PostArchiveResponseDTO {
  archiveId: number;
}

export type PostArchiveApiResponse = ApiResponse<PostArchiveResponseDTO>;
export type GetArchiveApiResponse = ApiResponse<Archive>;
export type GetCommentsApiResponse = ApiResponse<Comment[]>;
export type PostCommentApiResponse = ApiResponse<PostCommentResponseDTO>;
export type GetArchiveListApiResponse = ApiResponse<{
  archives: ArchiveCardDTO[];
  slice: { currentPage: number; size: number; hasNext: boolean };
}>;
