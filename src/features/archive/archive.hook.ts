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
  postLikeArchive,
  getLikeArchiveList,
  getSearchArchive,
  putComment,
  getMyArchiveList,
  patchArchiveOrder,
} from './archive.api';
import type {
  BaseArchiveDTO,
  Comment,
  GetCommentsApiResponse,
  GetArchiveListApiResponse,
  ArchiveCardDTO,
  PatchArchiveOrderDTO,
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
    'comments',
  );
};

export const useCreateComment = (archiveId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content }: { content: string; username: string; userProfile: string }) =>
      postCreateComment(archiveId, content),
    onMutate: async ({
      content,
      username,
      userProfile,
    }: {
      content: string;
      username: string;
      userProfile: string;
    }) => {
      await queryClient.cancelQueries({ queryKey: ['/archive', archiveId, 'comment'] });

      const previousComments = queryClient.getQueryData(['/archive', archiveId, 'comment']);

      const optimisticComment = {
        commentId: Math.random(),
        content: content,
        username: username,
        isMine: true,
        userProfile: userProfile,
      };

      queryClient.setQueryData(
        ['/archive', archiveId, 'comment'],
        (old: GetCommentsApiResponse) => {
          if (!old.data) return old;

          return [...old.data, optimisticComment];
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
      queryClient.invalidateQueries({ queryKey: ['/archive', archiveId, 'comment'] }).catch(err => {
        console.error('Failed to invalidate queries:', err);
      });
    },
  });
};

export const useUpdateComment = (archiveId: number, commentId: number, content: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content }: { content: string; username: string; userProfile: string }) =>
      putComment(archiveId, content),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['/archive', archiveId, 'comment'] });

      const previousComments = queryClient.getQueryData(['/archive', archiveId, 'comment']);

      queryClient.setQueryData(
        ['/archive', archiveId, 'comment'],
        (old: GetCommentsApiResponse) => {
          if (!old.data) return old;

          return {
            ...old,
            data: old.data.map(comment =>
              comment.commentId === commentId ? { ...comment, content: content } : comment,
            ),
          };
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
      queryClient.invalidateQueries({ queryKey: ['/archive', archiveId, 'comment'] }).catch(err => {
        console.error('Failed to invalidate queries:', err);
      });
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

      queryClient.setQueryData(
        ['/archive', archiveId, 'comment'],
        (old: GetCommentsApiResponse) => {
          if (!old.data) return old;

          return old.data.filter((comment: Comment) => comment.commentId !== commentId);
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
      queryClient.invalidateQueries({ queryKey: ['/archive', archiveId, 'comment'] }).catch(err => {
        console.error('Failed to invalidate queries:', err);
      });
    },
  });
};

export const usePopularArchiveList = (size: number) =>
  useQuery({
    queryKey: ['/archive', 'popularlity'],
    queryFn: () => getPopularlityArchiveList(size),
  });

export const useArchiveList = (sort: string, color: Color) => {
  return useCustomInfiniteQuery<GetArchiveListApiResponse, ArchiveCardDTO, Error>(
    ['/archive', sort, color],
    ({ pageParam }) => getArchiveList(sort, pageParam, color === 'DEFAULT' ? null : color),
    9,
    'archives',
  );
};

export const useSearchArchive = (searchKeyword: string, enabled: boolean = false) => {
  return useCustomInfiniteQuery<GetArchiveListApiResponse, ArchiveCardDTO, Error>(
    ['/archive', 'search', searchKeyword],
    ({ pageParam }) => getSearchArchive(searchKeyword, pageParam),
    9,
    'archives',
    enabled,
  );
};

export const useLikeArchiveList = () =>
  useQuery({
    queryKey: ['/archive', 'me', 'like'],
    queryFn: getLikeArchiveList,
  });

export const useLikeArchive = (archiveId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postLikeArchive(archiveId),
    onMutate: () => {
      const prevData = queryClient
        .getQueryCache()
        .findAll({ predicate: query => query.queryKey[0] === '/archive' });

      prevData.forEach(query => {
        queryClient.setQueryData(query.queryKey, (oldData: GetArchiveListApiResponse) => {
          if (!oldData.data) return oldData;

          return oldData.data.archives.map((archive: ArchiveCardDTO) =>
            archive.archiveId === archiveId
              ? {
                  ...archive,
                  isLiked: !archive.isLiked,
                }
              : archive,
          );
        });
      });

      return { prevData };
    },
    onError: (_, __, context) => {
      if (context) {
        context.prevData.forEach(query => {
          queryClient.invalidateQueries({ queryKey: query.queryKey }).catch(err => {
            console.error('Failed to invalidate query:', err);
          });
        });
      }
    },
    onSettled: () => {
      queryClient
        .invalidateQueries({ predicate: query => query.queryKey[0] === '/archive' })
        .catch(err => {
          console.error('Failed to invalidate queries:', err);
        });
    },
  });
};

export const useMyArchiveList = () =>
  useQuery({
    queryKey: ['/archive/me'],
    queryFn: getMyArchiveList,
  });

export const useUpdateArchiveOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PatchArchiveOrderDTO) => patchArchiveOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/archive/me'] }).catch(error => {
        console.error('Error invalidating queries:', error);
      });
    },
    onError: error => {
      console.error('Error updating post:', error);
    },
  });
};
