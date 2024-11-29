import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteArchive,
  deleteComment,
  getArchive,
  getComments,
  postCreateArchive,
  postCreateComment,
  putArchive,
  getArchiveList,
  getPopularlityArchiveList,
} from './archive.api';
import type {
  BaseArchiveDTO,
  Comment,
  GetCommentsApiResponse,
  PostCommentApiResponse,
  GetArchiveListApiResponse,
  ArchiveCardDTO,
} from './archive.dto';
import type { Color } from './colors.type';

import { useCustomInfiniteQuery } from '@/shared/hook';

export const useCreateArchive = () =>
  useMutation({
    mutationFn: (data: BaseArchiveDTO) => postCreateArchive(data),
  });

export const useUpdateArchive = (archiveId: number) =>
  useMutation({
    mutationFn: (data: BaseArchiveDTO) => putArchive(archiveId, data),
  });

export const useDeleteArchive = () =>
  useMutation({
    mutationFn: ({ archiveId }: { archiveId: number }) => deleteArchive(archiveId),
  });

export const useArchive = (archiveId: number) =>
  useQuery({
    queryKey: ['/archive', archiveId],
    queryFn: () => getArchive(archiveId),
  });

export const useComments = (archiveId: number) => {
  return useCustomInfiniteQuery<GetCommentsApiResponse, Comment, Error>(
    ['/archive', archiveId, 'comment'],
    ({ pageParam }) => getComments(archiveId, 10, pageParam),
    10,
  );
};

export const useCreateComment = (archiveId: number) =>
  useMutation({
    mutationFn: (content: string) => postCreateComment(archiveId, content),
  });

export const useDeleteComment = (archiveId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: { commentId: number }) => {
      return deleteComment(commentId);
    },
    onMutate: async ({ commentId }) => {
      await queryClient.cancelQueries({ queryKey: ['/archive', archiveId, 'comment'] });

      const previousComments = queryClient.getQueryData(['/archive', archiveId, 'comment']);

      queryClient.setQueryData(
        ['/archive', archiveId, 'comment'],
        (old: PostCommentApiResponse) => {
          if (Array.isArray(old?.data)) {
            return old.data.filter(
              (comment: Comment) => comment.commentId !== commentId,
            ) as Comment[];
          }
          console.error('Data is not an array:', old?.data);
          return old;
        },
      );

      return { previousComments };
    },
    onError: (err, _, context) => {
      console.log(err);
      if (context) {
        queryClient.setQueryData(['/archive', archiveId, 'comment'], context.previousComments);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['/archive', archiveId, 'comment'] });
    },
  });
};

export const usePopularArchiveList = () =>
  useQuery({
    queryKey: ['/archive', 'popularlity'],
    queryFn: () => getPopularlityArchiveList(),
  });

export const useArchiveList = (sort: string, color: Color | 'default') => {
  return useCustomInfiniteQuery<GetArchiveListApiResponse, ArchiveCardDTO, Error>(
    ['/archive', sort, color],
    ({ pageParam }) => getArchiveList(sort, pageParam, color === 'default' ? null : color),
    9,
  );
};

export const useSearchArchive = (searchKeyword: string) => {
  return useCustomInfiniteQuery<GetArchiveListApiResponse, ArchiveCardDTO, Error>(
    ['/archive/search', searchKeyword],
    ({ pageParam }) => getArchiveList(searchKeyword, pageParam),
    9,
  );
};
