import { useInfiniteQuery } from '@tanstack/react-query';

import { getPortfolioList } from '../api/portfolio.api';
import type { PortfolioParams } from '../model/types';

export const usePortfolioList = ({
  size = 10,
  sort,
  majorJobGroup,
  minorJobGroup,
}: PortfolioParams) => {
  return useInfiniteQuery({
    queryKey: ['portfolioList', { sort, majorJobGroup, minorJobGroup }],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const response = await getPortfolioList({
          page: pageParam,
          size,
          sort,
          majorJobGroup,
          minorJobGroup,
        });
        // API 응답의 data 필드를 반환
        return response.data;
      } catch (error) {
        console.error('Portfolio fetch error:', error);
        throw error;
      }
    },
    getNextPageParam: lastPage => {
      if (!lastPage) return undefined;
      // last가 true면 더 이상 페이지가 없음
      if (lastPage?.last) return undefined;
      // 다음 페이지 번호 반환
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });
};
