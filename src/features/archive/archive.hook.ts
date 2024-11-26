import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteArchive,
  deleteComment,
  getArchive,
  getComments,
  postCreateArchive,
  postCreateComment,
  putArchive,
} from './archive.api';
import type { BaseArchiveDTO, Comment } from './archive.dto';

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

export const useComment = (archiveId: number, enabled: boolean = false) =>
  useQuery({
    queryKey: ['/archive', archiveId, 'comment'],
    queryFn: () => getComments(archiveId),
    enabled,
  });

export const useCreateComment = (archiveId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => postCreateComment(archiveId, content),
    onMutate: async newCommentContent => {
      await queryClient.cancelQueries({ queryKey: ['/archive', archiveId, 'comment'] });

      const previousComments = queryClient.getQueryData(['/archive', archiveId, 'comment']);

      queryClient.setQueryData(['/archive', archiveId, 'comment'], (old: Comment[]) => [
        ...old,
        {
          commentId: Date.now(),
          content: newCommentContent,
          archiveId,
          userProfile: '',
          username: '',
          isMine: true,
        },
      ]);

      return { previousComments };
    },
    onError: (err, _, context) => {
      if (context) {
        queryClient.setQueryData(['/archive', archiveId, 'comment'], context.previousComments);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['/archive', archiveId, 'comment'] });
    },
  });
};

export const useDeleteComment = (archiveId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: { commentId: number }) => deleteComment(commentId),
    onMutate: async ({ commentId }) => {
      await queryClient.cancelQueries({ queryKey: ['/archive', archiveId, 'comment'] });

      const previousComments = queryClient.getQueryData(['/archive', archiveId, 'comment']);

      queryClient.setQueryData(['/archive', commentId, 'comment'], (old: Comment[]) =>
        old.filter((comment: Comment) => comment.commentId !== commentId),
      );

      return { previousComments };
    },
    onError: (err, _, context) => {
      if (context) {
        queryClient.setQueryData(['/archive', archiveId, 'comment'], context.previousComments);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['/archive', archiveId, 'comment'] });
    },
  });
};
