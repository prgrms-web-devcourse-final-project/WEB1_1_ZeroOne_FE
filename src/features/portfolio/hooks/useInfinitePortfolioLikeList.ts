import { useInfiniteQuery } from '@tanstack/react-query';

import { getPorfolioLikeList } from '../api/portfolio.api';
import type { Portfolio, PortfolioLikeListApiResponse } from '../model/types';

interface UseInfinitePortfolioLikeListProps {
  size?: number;
}

export const useInfinitePortfolioLikeList = ({
  size = 10,
}: UseInfinitePortfolioLikeListProps = {}) => {
  const query = useInfiniteQuery<PortfolioLikeListApiResponse>({
    queryKey: ['infiniteLikePortfolios'],
    queryFn: async ({ pageParam }) => {
      const params = {
        size,
        ...(pageParam ? { portFolioId: pageParam } : {}),
      };

      const response = await getPorfolioLikeList(params);
      return response;
    },
    getNextPageParam: lastPage => {
      if (!lastPage?.data?.hasNext) return undefined;
      return lastPage?.data.nextId ?? undefined;
    },
    initialPageParam: undefined,
  });

  // 중복 제거된 portfolios 반환
  const portfolios =
    query.data?.pages?.reduce<Portfolio[]>((acc, page) => {
      if (!page?.data?.content) return acc;

      const newPortfolios = page.data.content.filter(
        newPortfolio =>
          !acc.some(
            existingPortfolio => existingPortfolio.portFolioId === newPortfolio.portFolioId,
          ),
      );
      return [...acc, ...newPortfolios];
    }, []) ?? [];

  return {
    ...query,
    portfolios,
  };
};