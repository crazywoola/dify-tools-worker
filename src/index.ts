import { OpenAPIHono } from "@hono/zod-openapi";
import { bearerAuth } from "hono/bearer-auth";
import { Bindings } from "./bindings";
import { swaggerUI } from "@hono/swagger-ui";
import { getUser, createUser, updateUser } from "./users";

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

app
  .openapi(getUser, async (c) => {
    const user_id = c.req.param("user_id");
    try {
      let user = await c.env.DB.prepare("SELECT * FROM users WHERE user_id = ?")
        .bind(user_id)
        .first();
      if (!user) {
        return c.json({ error: "user not found" }, 404);
      }
      return c.json(user);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  })
  .openapi(createUser, async (c) => {
    const { user_id, user_name } = c.req.valid("json");
    try {
      let { success } = await c.env.DB.prepare(
        "INSERT INTO users (user_id, user_name) VALUES (?, ?)"
      )
        .bind(user_id, user_name)
        .run();
      if (success) {
        let user = await c.env.DB.prepare(
          "SELECT * FROM users WHERE user_id = ?"
        )
          .bind(user_id)
          .first();
        return c.json(user);
      } else {
        return c.json({ error: "user not created" }, 500);
      }
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  })
  .openapi(updateUser, async (c) => {
    const user_id = c.req.param("user_id");
    const { user_name } = c.req.valid("json");
    try {
      let { success } = await c.env.DB.prepare(
        "UPDATE users SET user_name = ? WHERE user_id = ?"
      )
        .bind(user_name, user_id)
        .run();
      if (success) {
        let user = await c.env.DB.prepare(
          "SELECT * FROM users WHERE user_id = ?"
        )
          .bind(user_id)
          .first();
        return c.json(user);
      } else {
        return c.json({ error: "user not created" }, 500);
      }
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  });

app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
});
export default app;
