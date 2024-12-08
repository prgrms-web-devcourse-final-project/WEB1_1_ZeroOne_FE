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
      const response = await getPortfolioList({
        page: pageParam,
        size,
        sort,
        majorJobGroup,
        minorJobGroup,
      });
      return response.data;
    },

    getNextPageParam: lastPage => {
      // 더 엄격한 조건 체크
      if (!lastPage || !lastPage.content || lastPage.last) {
        return undefined;
      }
      // 현재 페이지의 아이템이 size보다 적으면 마지막 페이지
      if (lastPage.content.length < size) {
        return undefined;
      }
      return lastPage.number + 1;
    },

    initialPageParam: 0,
  });
};
