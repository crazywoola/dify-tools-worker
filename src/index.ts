import { OpenAPIHono } from "@hono/zod-openapi";
import { bearerAuth } from "hono/bearer-auth";
import { Bindings } from "./bindings";
import { swaggerUI } from "@hono/swagger-ui";
// import { getUser, createUser, updateUser } from "./users";
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

app.get("/ui", swaggerUI({ url: "/doc" }));

app.use(
  bearerAuth({
    verifyToken: async (token, c) => {
      return token === c.env.TOKEN;
    },
  })
);

app.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
  type: 'http',
  scheme: 'bearer',
})

export default app;
