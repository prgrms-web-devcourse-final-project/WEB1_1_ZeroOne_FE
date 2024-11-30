import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useIntersectionObserver } from './useIntersectionObserver';

export const useCustomInfiniteQuery = <TData extends { data?: TItem[] }, TItem, TError>(
  queryKey: (string | number)[],
  queryFn: (context: { pageParam: number }) => Promise<TData>,
  pageSize = 9,
  enabled: boolean = false,
) => {
  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage } = useInfiniteQuery<
    TData,
    TError
  >({
    queryKey,
    queryFn: ({ pageParam = 0 }) => queryFn({ pageParam: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      if (Array.isArray(lastPage.data)) {
        const isLastPage = lastPage.data?.length < pageSize;
        return isLastPage ? null : allPages.length;
      }
      return null;
    },
    initialPageParam: 0,
    enabled: enabled,
  });

  const items = useMemo(() => {
    const temp: TItem[] = [];
    data?.pages.forEach(page => {
      page.data?.forEach(item => {
        temp.push(item);
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
