import { http } from 'msw';

import type { BaseArchiveDTO } from '@/features';

export const archiveHandlers = [
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
      const { title, description, type, tags, imageUrls } = body as BaseArchiveDTO;

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
  http.get('/archive/:archiveId', ({ params }) => {
    try {
      const archiveId = Number(params.archiveId);
      if (Number.isNaN(archiveId)) {
        return new Response(
          JSON.stringify({
            status: 400,
            reason: '잘못된 archiveId입니다.',
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
            title: '제목',
            description:
              '# h1\n## h2\n### 하이하이\n예제 **만드는** 중\n어떻게 _보일지_\n> 인용\n\n```\ncode\n```\n\n',
            type: 'red',
            canComment: true,
            tags: [{ content: '태그' }, { content: '태그2' }, { content: '태그3' }],
            imageUrls: [{ url: 'https://example.com/image.jpg' }],
            username: '사용자',
            job: '직업',
            likeCount: 10,
            commentCount: 5,
            hits: 20,
            isMine: true,
            userProfile: 'https://example.com/user.jpg',
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
  http.get('/archive/:archiveId/comment', ({ params, request }) => {
    try {
      const archiveId = Number(params.archiveId);

      const url = new URL(request.url);
      const size = Number(url.searchParams.get('size')) || 5;
      const page = Number(url.searchParams.get('page')) || 0;

      if (size <= 0 || page < 0) {
        return new Response(
          JSON.stringify({
            status: 400,
            reason: '잘못된 size 또는 page 값입니다.',
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

      if (Number.isNaN(archiveId)) {
        return new Response(
          JSON.stringify({
            status: 400,
            reason: '잘못된 archiveId입니다.',
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
          data: Array.from({ length: size }).map((_, index) => ({
            commentId: page * size + index,
            content: 'content',
            username: 'username',
            isMine: true,
            userProfile: 'url',
          })),
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
  http.delete('/archive/comment/:commentId', ({ params }) => {
    try {
      const commentId = Number(params.commentId);
      if (Number.isNaN(commentId)) {
        return new Response(
          JSON.stringify({
            status: 400,
            reason: '잘못된 commentId입니다.',
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
  http.delete('/archive/:archiveId', ({ params }) => {
    try {
      const archiveId = Number(params.archiveId);
      if (Number.isNaN(archiveId)) {
        return new Response(
          JSON.stringify({
            status: 400,
            reason: '잘못된 archiveId입니다.',
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
  http.put('/archive/:archiveId', async ({ params, request }) => {
    try {
      const archiveId = Number(params.archiveId);
      if (Number.isNaN(archiveId)) {
        return new Response(
          JSON.stringify({
            status: 400,
            reason: '잘못된 archiveId입니다.',
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

      const { title, description, type, tags, imageUrls } = body as BaseArchiveDTO;

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
  http.post('/archive/:archiveId/comment', async ({ params, request }) => {
    try {
      const archiveId = Number(params.archiveId);
      if (Number.isNaN(archiveId)) {
        return new Response(
          JSON.stringify({
            status: 400,
            reason: '잘못된 archiveId입니다.',
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

      const { content } = body as { content: string };
      if (!content) {
        return new Response(
          JSON.stringify({
            status: 400,
            reason: 'content 필드가 누락되었습니다.',
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
            commentId: Math.floor(Math.random() * 1000),
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
