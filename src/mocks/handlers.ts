import { http } from 'msw';

import type { PostArchiveRequestDTO } from '@/features';

export const handlers = [
  http.post('/archive', async ({ request }) => {
    try {
      const body = await request.json();
      if (!body) {
        return new Response(
          JSON.stringify({
            status: 400,
            reason: '요청 본문이 비어 있습니다.',
            timeStamp: new Date().toISOString(),
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }
      const { title, description, type, tags, imageUrls } = body as PostArchiveRequestDTO;

      if (!title || !description || !type || tags.length === 0 || imageUrls.length === 0) {
        return new Response(
          JSON.stringify({
            status: 400,
            reason: '필수 필드가 누락되었습니다.',
            timeStamp: new Date().toISOString(),
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }

      return new Response(
        JSON.stringify({
          data: {
            archiveId: Math.floor(Math.random() * 1000),
          },
          timeStamp: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch {
      return new Response(
        JSON.stringify({
          status: 500,
          reason: '서버 에러가 발생했습니다.',
          timeStamp: new Date().toISOString(),
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
  }),
];
