import { createRoute } from "@hono/zod-openapi";
import { IdSchema, PayloadSchema, UserSchema } from "./schema";

export const getUser = createRoute({
  method: "get",
  path: "/users/{id}",
  security: [
    {
      Bearer: [],
    },
  ],
  request: {
    params: IdSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Retrieve the user",
    },
  },
});

export const createUser = createRoute({
  method: "post",
  path: "/users",
  security: [
    {
      Bearer: [],
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: PayloadSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Create a new user",
    },
  },
});

export const updateUser = createRoute({
  method: "put",
  path: "/users/{id}",
  security: [
    {
      Bearer: [],
    },
  ],
  request: {
    params: IdSchema,
    body: {
      content: {
        "application/json": {
          schema: PayloadSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Update the user",
    },
  },
});
