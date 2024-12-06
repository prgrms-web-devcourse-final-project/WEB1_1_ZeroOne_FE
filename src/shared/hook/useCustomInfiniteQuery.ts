import { useInfiniteQuery } from '@tanstack/react-query';
import throttle from 'lodash-es/throttle';
import throttle from 'lodash-es/throttle';
import { useMemo, useEffect, useEffect } from 'react';

import { useIntersectionObserver } from './useIntersectionObserver';

export const useCustomInfiniteQuery = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TData extends { [key: string]: any },
  TItem,
  TError,
>(
export const useCustomInfiniteQuery = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TData extends { [key: string]: any },
  TItem,
  TError,
>(
  queryKey: (string | number)[],
  queryFn: (context: { pageParam: number }) => Promise<TData>,
  pageSize: number,
  dataKey: string,
  enabled: boolean = false,
  staleTime: number = 0,
) => {
  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage, refetch, isPending, refetch } =
    useInfiniteQuery<TData, TError>({
      queryKey,
      queryFn: ({ pageParam = 0 }) => queryFn({ pageParam: pageParam as number }),
      getNextPageParam: (lastPage, allPages) => {
        if (Array.isArray(lastPage.data[dataKey][dataKey])) {
          const isLastPage = lastPage.data[dataKey][dataKey]?.length < pageSize;
          return isLastPage ? null : allPages.length;
        }
        return null;
      },
      initialPageParam: 0,
      enabled: enabled,
      staleTime,
      refetchOnMount: 'always',
      refetchOnWindowFocus: true,
    });

  const items = useMemo(() => {
    const temp: TItem[] = [];
    data?.pages.forEach(page => {
      page.data[dataKey]?.forEach((item: TItem) => {
        temp.push(item);
      });
    });
    return temp;
  }, [data, dataKey]);

  const throttledFetchNextPage = useMemo(
    () => throttle(() => fetchNextPage(), 500),
    [fetchNextPage],
  );

  useEffect(() => {
    return () => {
      throttledFetchNextPage.cancel();
    };
  }, [throttledFetchNextPage]);

  const ref = useIntersectionObserver(
    () => {
      throttledFetchNextPage().catch(() => {
        console.error('Failed to fetch next page');
      });
    },
    { threshold: 1.0 },
  );

  return { items, isFetchingNextPage, isLoading, isError, ref, fetchNextPage, refetch, isPending, refetch };
};
