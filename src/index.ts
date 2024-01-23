import { z, createRoute, OpenAPIHono } from "@hono/zod-openapi";

type Bindings = {
  OPENAPI_VERSION: string;
  TOOL_VERSION: string;
  TOOL_NAME: string;
  TOOL_DESCRIPTION: string;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();

app.doc31("/doc", (c) => ({
  openapi: c.env.OPENAPI_VERSION,
  info: {
    version: c.env.TOOL_VERSION,
    title: c.env.TOOL_NAME,
    description: c.env.TOOL_DESCRIPTION,
  },
  servers: [{ url: new URL(c.req.url).origin }],
}));

const reqSchema = z.object({
  count: z.number().openapi({ example: 1, description: "Number of quotes to get" }),
});

const resSchema = z.object({
  result: z.string().openapi({ example: "example request", description: "example request" }),
});

const quoteRoute = createRoute({
  method: "post",
  path: "/quotes",
  operationId: "GetQuotesFromBreakingBad", // required
  summary: "Get quotes from Breaking Bad",
  description: "Retrieve quotes from the Breaking Bad series",
  request: {
    body: {
      content: {
        "application/json": { schema: reqSchema },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": { schema: resSchema },
      },
      description: "OK",
    }
  },
});

app.openapi(quoteRoute, async (c) => {
  const { count } = c.req.valid("json");
  const url = `https://api.breakingbadquotes.xyz/v1/quotes/${count}`;
  const result = await fetch(url).then((res) => res.text());
  return c.json({ result });
});

export default app;
