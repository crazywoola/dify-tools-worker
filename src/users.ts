import { z } from "@hono/zod-openapi";
import { createRoute } from "@hono/zod-openapi";
import {
  InternalServerErrorSchema,
  NotFoundSchema,
  PayloadSchema,
  UserSchema,
  IdSchema,
} from "./schema";

export const getUser = createRoute({
  method: "get",
  path: "/users/{user_id}",
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
    404: {
      content: {
        "application/json": {
          schema: NotFoundSchema,
        },
      },
      description: "User not found",
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
    500: {
      content: {
        "application/json": {
          schema: InternalServerErrorSchema,
        },
      },
      description: "Internal server error",
    },
  },
});

export const updateUser = createRoute({
  method: "put",
  path: "/users/{user_id}",
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
    500: {
      content: {
        "application/json": {
          schema: InternalServerErrorSchema,
        },
      },
      description: "Internal server error",
    },
  },
});
