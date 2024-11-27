import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import {
  deleteArchive,
  deleteComment,
  getArchive,
  getComments,
  postCreateArchive,
  postCreateComment,
  putArchive,
} from './archive.api';
import type {
  BaseArchiveDTO,
  Comment,
  GetCommentsApiResponse,
  PostCommentApiResponse,
} from './archive.dto';

import { useIntersectionObserver } from '@/shared/hook';

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

export const useComments = (archiveId: number, enabled: boolean = false) => {
  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage } = useInfiniteQuery<
    GetCommentsApiResponse,
    Error
  >({
    queryKey: ['/archive', archiveId, 'comment'],
    queryFn: ({ pageParam = 0 }) => getComments(archiveId, 10, pageParam as number),
    enabled,
    getNextPageParam: (lastPage, allPages) => {
      if (Array.isArray(lastPage.data)) {
        const isLastPage = lastPage.data?.length < 10;
        return isLastPage ? null : allPages.length;
      }
      return null;
    },
    initialPageParam: 0,
  });

  const items = useMemo(() => {
    const temp: Comment[] = [];
    data?.pages.forEach(page => {
      page.data?.forEach(comment => {
        temp.push(comment);
      });
    });
    return temp;
  }, [data]);

  const ref = useIntersectionObserver(
    () => {
      void fetchNextPage();
    },
    { threshold: 1.0 },
  );

  return { items, isFetchingNextPage, isLoading, isError, ref, fetchNextPage };
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
