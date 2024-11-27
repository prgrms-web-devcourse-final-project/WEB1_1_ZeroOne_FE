import type { PostArchiveApiResponse, BaseArchiveDTO } from './archive.dto';

import api from '@/shared/api/baseApi';

export const postCreateArchive = ({
  title,
  description,
  type,
  canComment,
  tags,
  imageUrls,
}: BaseArchiveDTO) =>
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
