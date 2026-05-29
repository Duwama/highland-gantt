import { getStore } from "@netlify/blobs";

const STORE = "highland-gantt";
const KEY = "schedule";

export default async (req) => {
  const store = getStore(STORE);

  if (req.method === "GET") {
    const data = await store.get(KEY, { type: "json" });
    return Response.json(data ?? null, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  if (req.method === "POST" || req.method === "PUT") {
    let body;
    try { body = await req.json(); }
    catch { return new Response("Invalid JSON", { status: 400 }); }
    if (!Array.isArray(body)) return new Response("Expected an array", { status: 400 });
    await store.setJSON(KEY, body);
    return Response.json({ ok: true, count: body.length });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config = { path: "/api/schedule" };
