import { createRoute } from "@hono/zod-openapi";
import {
  ResponseSchema,
  PayloadSchema,
  IdSchema,
} from "./schema";

export const getUser = createRoute({
  method: "get",
  path: "/users/{user_id}",
  operationId: "getUser",
  summary: "Retrieve the user by user_id used in the dify service",
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
          schema: ResponseSchema,
        },
      },
      description: "Retrieve the user",
    }   
  },
});

export const createUser = createRoute({
  method: "post",
  path: "/users",
  operationId: "createUser",
  summary: "Create a new user",
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
          schema: ResponseSchema,
        },
      },
      description: "Create a new user",
    }
  },
});

export const updateUser = createRoute({
  method: "put",
  path: "/users/{user_id}",
  operationId: "updateUser",
  summary: "Update the user by user_id used in the dify service",
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
          schema: ResponseSchema,
        },
      },
      description: "Update the user",
    }
  },
});
