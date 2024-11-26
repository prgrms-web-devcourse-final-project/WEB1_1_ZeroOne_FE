import type { PostArchiveApiResponse, PostArchiveRequestDTO } from './archive.dto';

import api from '@/shared/api/baseApi';

export const postCreateArchive = ({
  title,
  description,
  type,
  canComment,
  tags,
  imageUrls,
}: PostArchiveRequestDTO) =>
  api
    .post<PostArchiveApiResponse>('/archive', {
      title,
      description,
      type,
      canComment,
      tags,
      imageUrls,
    })
    .then(res => res.data);
