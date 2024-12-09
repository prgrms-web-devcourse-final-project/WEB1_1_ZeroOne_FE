import type {
  MainPortfolioResponse,
  PortfolioListApiResponse,
  PortfolioLikeListApiResponse,
  PortfolioParams,
  PortfolioViewResponse,
  PortfolioLikeResponse,
  GetPortfolioLikeListParams,
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
export const togglePortfolioLike = async (
  portFolioId: string | number,
): Promise<PortfolioLikeResponse> => {
  const response = await api.post<PortfolioLikeResponse>(
    `${PORTFOLIO_API_URL}/${portFolioId}/likes`,
  );
  return response.data;
};

export const getPorfolioLikeList = async (
  params?: GetPortfolioLikeListParams,
): Promise<PortfolioLikeListApiResponse> => {
  const response = await api.get<PortfolioLikeListApiResponse>(`${PORTFOLIO_API_URL}/my-page`, {
    params,
  });
  return response.data;
};
