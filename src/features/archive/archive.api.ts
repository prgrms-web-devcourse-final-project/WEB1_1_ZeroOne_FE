import type { PostCommentApiResponse } from './archive.dto';
import type { GetArchiveApiResponse, GetCommentsApiResponse } from './archive.dto';
import type {
  PostArchiveApiResponse,
  BaseArchiveDTO,
  GetArchiveListApiResponse,
} from './archive.dto';
import type { Color } from './colors.type';

import api from '@/shared/api/baseApi';

export const postCreateArchive = (data: Partial<BaseArchiveDTO>) =>
  api.post<PostArchiveApiResponse>('/archive', data).then(res => res.data);

export const getArchive = (archiveId: number) =>
  api.get<GetArchiveApiResponse>(`/archive/${archiveId}`).then(res => res.data);

export const putArchive = (archiveId: number, data: Partial<BaseArchiveDTO>) =>
  api.put<PostArchiveApiResponse>(`/archive/${archiveId}`, data).then(res => res.data);

export const deleteArchive = (archiveId: number) =>
  api.delete<PostArchiveApiResponse>(`/archive/${archiveId}`).then(res => res.data);

export const getComments = (archiveId: number, size: number = 10, page: number = 0) =>
  api
    .get<GetCommentsApiResponse>(`/archive/${archiveId}/comment`, {
      params: { size, page },
    })
    .then(res => res.data);

export const postCreateComment = (archiveId: number, content: string) =>
  api
    .post<PostCommentApiResponse>(`/archive/${archiveId}/comment`, { content })
    .then(res => res.data);

export const deleteComment = (commentId: number) =>
  api.delete<PostCommentApiResponse>(`/archive/comment/${commentId}`).then(res => res.data);

export const getPopularlityArchiveList = () =>
  api
    .get<GetArchiveListApiResponse>('/archive', {
      params: {
        sort: 'popularlity',
        page: 0,
        size: 5,
      },
    })
    .then(res => res.data);

export const getArchiveList = (sort: string, page: number, color?: Color | null) =>
  api
    .get<GetArchiveListApiResponse>('/archive', {
      params: {
        sort,
        page,
        size: 9,
        color,
      },
    })
    .then(res => res.data);

export const getSearchArchive = (searchKeyword: string, page: number) =>
  api
    .get<GetArchiveListApiResponse>('/archive/search', {
      params: {
        searchKeyword,
        page,
        size: 9,
      },
    })
    .then(res => res.data);

export const postLikeArchive = (archiveId: number) => api.post(`/archive/${archiveId}`);

export const getLikeArchiveList = () =>
  api.get<GetArchiveListApiResponse>('/archive/me/like').then(res => res.data);
