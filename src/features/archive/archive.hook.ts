import { useMutation } from '@tanstack/react-query';

import { postCreateArchive } from './archive.api';
import type { PostArchiveApiResponse, BaseArchiveDTO } from './archive.dto';

export const useCreateArchive = () =>
  useMutation<PostArchiveApiResponse, Error, BaseArchiveDTO>({
    mutationFn: (data: BaseArchiveDTO) => postCreateArchive(data),
  });
