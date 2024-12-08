import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getUserDefault,
  getUserEdit,
  getUserProfile,
  postCreateUser,
  putUserEdit,
} from './user.api';
import type { PostUserDTO, PutUserDTO } from './user.dto';

export const useGetUserDefault = () => {
  return useQuery({
    queryKey: ['/user', 'profile'],
    queryFn: () => getUserDefault(),
  });
};

export const useGetUserProfile = (userId: number) => {
  return useQuery({
    queryKey: ['/user', userId, 'profile'],
    queryFn: () => getUserProfile(userId),
  });
};

export const useGetUserEdit = (userId: number) => {
  return useQuery({
    queryKey: ['/user', userId, 'edit'],
    queryFn: () => getUserEdit(userId),
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: ({ data }: { data: PostUserDTO }) => postCreateUser(data),
  });
};

export const useEditUser = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: PutUserDTO }) => putUserEdit(data, userId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/user', userId, 'edit'] }).catch(error => {
        console.error('Failed to invalidate queries: ', error);
      });
    },
  });
};
