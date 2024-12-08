import { useQuery } from '@tanstack/react-query';

import { getMainPortfolioList } from '../api/portfolio.api';

export const useMainPortfolioList = () => {
  return useQuery({
    queryKey: ['/portFolio', 'main'],
    queryFn: getMainPortfolioList,
  });
};
