import type { Color } from '../archive';
import type { UserDataState } from './model/user.store';

import type { ApiResponse } from '@/shared/api';

export type UserRole = 'REAL_NEWBIE' | 'JUST_NEWBIE' | 'OLD_NEWBIE' | 'USER' | 'ADMIN';

export interface UserDefaultInfo {
  email: string;
  name: string;
  imageUrl: string;
}

export interface BaseUserDTO {
  name: string;
  briefIntro: string;
  imageUrl: string;
  majorJobGroup: string;
  minorJobGroup: string;
  jobTitle: string;
  division: string;
}

export interface PostUserDTO extends BaseUserDTO {
  url: string[];
  s3StoredImageUrls: string[];
}

export interface PutUserDTO extends BaseUserDTO {
  email: string;
  portfolioLink: string;
  socials: string[];
}

export interface User extends BaseUserDTO {
  email: string;
  socials: string[];
  role: UserRole;
  color: Color;
  portfolioLink: string;
}

export interface PostUserResponseDTO {
  userId: number;
}

export type GetUserDefaultApiResponse = ApiResponse<UserDefaultInfo>;
export type PostUserApiReponse = ApiResponse<PostUserResponseDTO>;
export type GetUserProfileApiResponse = ApiResponse<User>;
export type GetEditUserApiResponse = ApiResponse<PutUserDTO>;
export type PutEditUserApiResponse = ApiResponse<PostUserResponseDTO>;
export type GetMyProfileApiResponse = ApiResponse<UserDataState>;
