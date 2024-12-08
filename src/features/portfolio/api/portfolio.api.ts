import type {
  MainPortfolioResponse,
  PortfolioListApiResponse,
  PortfolioParams,
  PortfolioViewResponse,
} from '../model/types';

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

export const getMainPortfolioList = async (): Promise<MainPortfolioResponse> => {
  const response = await api.get<MainPortfolioResponse>(`${PORTFOLIO_API_URL}/main`);
  return response.data;
};

export const incrementViewCount = async (
  portfolioId: string | number,
): Promise<PortfolioViewResponse> => {
  const response = await api.get<PortfolioViewResponse>(`${PORTFOLIO_API_URL}/${portfolioId}`);
  return response.data;
};
