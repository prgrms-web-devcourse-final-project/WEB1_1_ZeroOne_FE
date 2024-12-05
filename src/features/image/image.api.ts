import type { PostImagesApiResponse } from './image.dto';

import api from '@/shared/api/baseApi';

export const postImages = (data: FormData) =>
  api
    .post<PostImagesApiResponse>('/upload/images', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data);
