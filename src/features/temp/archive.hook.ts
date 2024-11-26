import { useMutation } from '@tanstack/react-query';

import { postCreateArchive } from './archive.api';
import type { PostArchiveApiResponse, PostArchiveRequestDTO } from './archive.dto';

export const useCreateArchive = () =>
  useMutation<PostArchiveApiResponse, Error, PostArchiveRequestDTO>({
    mutationFn: (data: PostArchiveRequestDTO) => postCreateArchive(data),
  });
