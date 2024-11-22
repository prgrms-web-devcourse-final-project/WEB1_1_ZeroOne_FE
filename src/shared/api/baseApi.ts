import axios, { isAxiosError } from 'axios';

const api = axios.create({
  baseURL: ``, // Backend API Domain 주소 넣기
  timeout: 10_000,
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (isAxiosError(error)) {
      return Promise.reject(error);
    }

    return Promise.reject(new Error('알 수 없는 에러 발생'));
  },
);

export default api;
