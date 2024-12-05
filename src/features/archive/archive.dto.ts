import type { Color } from './colors.type';

import type { ApiResponse } from '@/shared/api';

export interface BaseArchiveDTO {
  title: string;
  description: string;
  introduction: string;
  colorType: Color;
  canComment: boolean;
  tags: { tag: string }[];
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
  type: Color;
}

export interface ArchiveCardDTO {
  archiveId: number;
  title: string;
  introduction: string;
  type: Color;
  likeCount: number;
  username: string;
  imageUrl: string;
  createDate: string;
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

export interface PatchArchiveOrderDTO {
  orderRequest: Record<number, number>;
}

export type Meta = {
  currentPage: number;
  size: number;
  hasNext: boolean;
};

export type CommentPageData = {
  comments: Comment[];
  meta: Meta;
};

export type ArchivePageData = {
  archives: ArchiveCardDTO[];
  meta: Meta;
};

export type Page<T> = {
  data: T;
  timeStamp: string;
};

export type CommentsPageDTO = {
  pages: Page<CommentPageData>[];
  pageParams: number[];
};

export type ArchivePageDTO = {
  pages: Page<ArchivePageData>[];
  pageParams: number[];
};

export type PostArchiveApiResponse = ApiResponse<PostArchiveResponseDTO>;
export type GetArchiveApiResponse = ApiResponse<Archive>;
export type GetCommentsApiResponse = ApiResponse<Comment[]>;
export type PostCommentApiResponse = ApiResponse<PostCommentResponseDTO>;
export type GetArchiveListApiResponse = ApiResponse<{
  archives: ArchiveCardDTO[];
  slice: Meta;
}>;
