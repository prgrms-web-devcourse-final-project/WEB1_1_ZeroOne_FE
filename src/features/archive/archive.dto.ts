import type { Color } from './colors.type';

import type { ApiResponse } from '@/shared/api';

export interface BaseArchiveDTO {
  title: string;
  description: string;
  type: Color;
  canComment: boolean;
  tags: { content: string }[];
  imageUrls: { url: string }[];
}

export interface PostArchiveResponseDTO {
  archiveId: number;
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
  type: Color;
  likeCount: number;
  usename: string;
  thumbnail: string;
  createDate: Date;
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

export type PostArchiveApiResponse = ApiResponse<PostArchiveResponseDTO>;
export type GetArchiveApiResponse = ApiResponse<Archive>;
export type GetCommentsApiResponse = ApiResponse<Comment[]>;
export type PostCommentApiResponse = ApiResponse<PostCommentResponseDTO>;
