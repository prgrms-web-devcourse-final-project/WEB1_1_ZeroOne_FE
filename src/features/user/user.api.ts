import type {
  GetEditUserApiResponse,
  GetMyProfileApiResponse,
  GetUserProfileApiResponse,
  PostUserApiReponse,
  PutEditUserApiResponse,
  PutUserDTO,
} from './user.dto';
import type { GetUserDefaultApiResponse, PostUserDTO } from './user.dto';

import api from '@/shared/api/baseApi';

export const getUserDefault = () =>
  api.get<GetUserDefaultApiResponse>('/profile').then(res => res.data);

export const postCreateUser = (data: PostUserDTO) =>
  api.post<PostUserApiReponse>('/profile', data).then(res => res.data);

export const getUserProfile = (userId: number) =>
  api.get<GetUserProfileApiResponse>(`/user/${userId}/profile`);

export const getUserEdit = (userId: number) =>
  api.get<GetEditUserApiResponse>(`/user/${userId}/edit`).then(res => res.data);

export const putUserEdit = (data: PutUserDTO, userId: number) =>
  api.put<PutEditUserApiResponse>(`/user/${userId}/edit`, data).then(res => res.data);

export const getMyProfile = () =>
  api.get<GetMyProfileApiResponse>('/user/my-info').then(res => res.data);
