import type { PortfolioListApiResponse, PortfolioParams } from '../model/types';

import api from '@/shared/api/baseApi';

const PORTFOLIO_API_URL = '/portFolio';

export const getPortfolioList = async (
  params: PortfolioParams,
): Promise<PortfolioListApiResponse> => {
  const { page, size, sort, majorJobGroup, minorJobGroup } = params;

  const response = await api.get<PortfolioListApiResponse>(PORTFOLIO_API_URL, {
    params: {
      page,
      size,
      sort,
      majorJobGroup,
      minorJobGroup,
    },
  });

  return response.data;
};

