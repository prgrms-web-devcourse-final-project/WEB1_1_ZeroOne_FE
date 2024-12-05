import { useMutation } from '@tanstack/react-query';

import { postImages } from './image.api';

export const useImageUpload = () =>
  useMutation({
    mutationFn: (data: FormData) => postImages(data),
  });
