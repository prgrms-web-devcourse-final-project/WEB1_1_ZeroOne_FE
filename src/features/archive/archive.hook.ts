import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

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
  CommentsPageDTO,
  ArchivePageDTO,
} from './archive.dto';
import type { Color } from './colors.type';

import { useCustomInfiniteQuery } from '@/shared/hook';
import { customToast } from '@/shared/ui';

export const useCreateArchive = () =>
  useMutation({
    mutationFn: (data: BaseArchiveDTO) => postCreateArchive(data),
    onError: async (err: AxiosError<{ status: number; reason: string; timeStamp: string }>) => {
      const message = err.response?.data?.reason || '아카이브 작성에 실패하였습니다.';
      await customToast({ text: message, timer: 3000, icon: 'error' });
    },
  });

export const useUpdateArchive = (archiveId: number) =>
  useMutation({
    mutationFn: (data: BaseArchiveDTO) => putArchive(archiveId, data),
    onError: async () => {
      await customToast({ text: '아카이브 수정에 실패하였습니다', timer: 3000, icon: 'error' });
    },
  });

export const useDeleteArchive = () => {
  return useMutation({
    mutationFn: ({ archiveId }: { archiveId: number }) => deleteArchive(archiveId),
  });
};

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

      queryClient.setQueryData(['/archive', archiveId, 'comment'], (old: CommentsPageDTO) => {
        if (!old) return old;

        const updatedPages = old.pages.map((page, index) => {
          if (index === 0) {
            return {
              ...page,
              data: {
                ...page.data,
                comments: [optimisticComment, ...page.data.comments],
              },
            };
          }
          return page;
        });

        return {
          ...old,
          pages: updatedPages,
        };
      });

      return { previousComments, optimisticComment };
    },
    onSuccess: async (newComment, _, context) => {
      queryClient.setQueryData(['/archive', archiveId, 'comment'], (old: CommentsPageDTO) => {
        if (!old) return old;

        const updatedPages = old.pages.map(page => ({
          ...page,
          data: {
            ...page.data,
            comments: page.data.comments.map(comment =>
              comment.commentId === context?.optimisticComment.commentId
                ? { ...comment, commentId: newComment.data?.commentId }
                : comment,
            ),
          },
        }));

        return {
          ...old,
          pages: updatedPages,
        };
      });

      await customToast({ text: '댓글이 작성되었습니다.', timer: 3000, icon: 'success' });
    },
    onError: async (err, _, context) => {
      await customToast({ text: '댓글 작성에 실패하였습니다', timer: 3000, icon: 'error' });
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
    mutationFn: ({ content }: { content: string }) => putComment(commentId, content),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['/archive', archiveId, 'comment'] });

      const previousComments = queryClient.getQueryData(['/archive', archiveId, 'comment']);

      queryClient.setQueryData(['/archive', archiveId, 'comment'], (old: CommentsPageDTO) => {
        if (!old) return old;

        const updatedPages = old.pages.map(page => ({
          ...page,
          data: {
            ...page.data,
            comments: page.data.comments.map((comment: Comment) =>
              comment.commentId === commentId ? { ...comment, content } : comment,
            ),
          },
        }));

        return {
          ...old,
          pages: updatedPages,
        };
      });

      return { previousComments };
    },
    onSuccess: async () => {
      await customToast({ text: '댓글이 수정되었습니다', timer: 3000, icon: 'success' });
    },
    onError: async (err, _, context) => {
      await customToast({ text: '댓글 수정에 실패하였습니다', timer: 3000, icon: 'error' });
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

      queryClient.setQueryData(['/archive', archiveId, 'comment'], (old: CommentsPageDTO) => {
        if (!old) return old;

        const updatedPages = old.pages.map(page => ({
          ...page,
          data: {
            ...page.data,
            comments: page.data.comments.filter(
              (comment: Comment) => comment.commentId !== commentId,
            ),
          },
        }));

        return {
          ...old,
          pages: updatedPages,
        };
      });

      return { previousComments };
    },
    onSuccess: async () => {
      await customToast({ text: '댓글이 삭제되었습니다', timer: 3000, icon: 'success' });
    },
    onError: async (err, _, context) => {
      await customToast({ text: '댓글 삭제에 실패하였습니다', timer: 3000, icon: 'error' });
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
    ['/archive', 'list', sort, color],
    ({ pageParam }) => getArchiveList(sort, pageParam, color === 'DEFAULT' ? null : color),
    9,
    'archives',
    true,
  );
};

export const useSearchArchive = (searchKeyword: string) => {
  return useCustomInfiniteQuery<GetArchiveListApiResponse, ArchiveCardDTO, Error>(
    ['/archive', 'list', 'search', searchKeyword],
    ({ pageParam }) => getSearchArchive(searchKeyword, pageParam),
    9,
    'archives',
    true,
  );
};

export const useLikeArchiveList = () => {
  return useCustomInfiniteQuery<GetArchiveListApiResponse, ArchiveCardDTO, Error>(
    ['/archive', 'list', 'me', 'like'],
    ({ pageParam }) => getLikeArchiveList(pageParam),
    9,
    'archives',
    true,
  );
};

export const useLikeArchive = (archiveId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postLikeArchive(archiveId),
    onMutate: async () => {
      // TODO : isLiked optimistic update
      await queryClient.cancelQueries({ queryKey: ['/archive', 'list', 'me', 'like'] });

      const prevArchiveList = queryClient.getQueryData(['/archive', 'list', 'me', 'like']);
      const prevLikedData = queryClient.getQueryCache().findAll({
        predicate: query => query.queryKey[0] === '/archive' && query.queryKey[1] === 'list',
      });

      queryClient.setQueryData(['/archive', 'list', 'me', 'like'], (old: ArchivePageDTO) => {
        if (!old) return old;

        const updatedPages = old.pages.map(page => ({
          ...page,
          data: {
            ...page.data,
            archives: page.data.archives.filter(
              (archive: ArchiveCardDTO) => archive.archiveId !== archiveId,
            ),
          },
        }));

        return {
          ...old,
          pages: updatedPages,
        };
      });

      prevLikedData.forEach(query => {
        queryClient.setQueryData(query.queryKey, (old: ArchivePageDTO) => {
          if (!old) return old;

          const updatedPages = old.pages.map(page => ({
            ...page,
            data: {
              ...page.data,
              archives: page.data.archives.map((archive: ArchiveCardDTO) => {
                if (archive.archiveId === archiveId) {
                  return {
                    ...archive,
                    isLiked: !archive.isLiked,
                  };
                }
                return archive;
              }),
            },
          }));

          return {
            ...old,
            pages: updatedPages,
          };
        });
      });

      return { prevArchiveList, prevLikedData };
    },
    onError: (err, _, context) => {
      if (context) {
        queryClient.setQueryData(['/archive', archiveId, 'comment'], context.prevArchiveList);
        context.prevLikedData.forEach(query => {
          queryClient.invalidateQueries({ queryKey: query.queryKey }).catch(err => {
            console.error('Failed to invalidate query:', err);
          });
        });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/archive', 'list', 'me', 'like'] });
      await queryClient
        .invalidateQueries({
          predicate: query => query.queryKey[0] === '/archive' && query.queryKey[1] === 'list',
        })
        .catch(err => {
          console.error('Failed to invalidate queries:', err);
        });
    },
  });
};

export const useMyArchiveList = () =>
  useQuery({
    queryKey: ['/archive', 'list', 'me'],
    queryFn: getMyArchiveList,
  });

export const useUpdateArchiveOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PatchArchiveOrderDTO) => patchArchiveOrder(data),
    onSuccess: async () => {
      await customToast({ text: '아카이브 순서가 변경되었습니다', timer: 3000, icon: 'success' });

      queryClient.invalidateQueries({ queryKey: ['/archive', 'list', 'me'] }).catch(error => {
        console.error('Error invalidating queries:', error);
      });
    },
    onError: async () => {
      await customToast({
        text: '아카이브 순서 변경에 실패하였습니다',
        timer: 3000,
        icon: 'error',
      });
    },
  });
};
