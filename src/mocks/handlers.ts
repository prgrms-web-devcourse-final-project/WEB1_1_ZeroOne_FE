import { http } from "msw";

// 요청 핸들러 정의
export const handlers = [
  // GET 요청 핸들러
  http.get("/api/users", ({ request }) => {
    return new Response(
      JSON.stringify([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
      ]),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }),
];
