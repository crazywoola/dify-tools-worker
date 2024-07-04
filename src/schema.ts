import { z } from "@hono/zod-openapi";

export const IdSchema = z.object({
  id: z.string().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: "xxxx-xxx-xxx-xxxx",
    description: "User ID From Dify",
  }),
});

export const PayloadSchema = z.object({
  user_id: z.string().openapi({
    example: "xxxx-xxx-xxx-xxxx",
    description: "User ID From Dify",
  }),
  user_name: z
    .string()
    .openapi({ example: "John Doe", description: "User Name" }),
});

export const UserSchema = z
  .object({
    id: z.number().openapi({ example: 1, description: "User ID" }),
    user_id: z.string().openapi({
      example: "xxxx-xxx-xxx-xxxx",
      description: "User ID From Dify",
    }),
    user_name: z
      .string()
      .openapi({ example: "John Doe", description: "User Name" }),
  })
  .openapi("User");

  
export const NotFoundSchema = z.object({
  codde: z.number().openapi({
    example: 404,
    description: "Error Code",
  }),
  error: z.string().openapi({
    example: "Not Found",
    description: "Error Message",
  }),
});

export const BadRequestSchema = z.object({
  code: z.number().openapi({
    example: 400,
    description: "Error Code",
  }),
  error: z.string().openapi({
    example: "Bad Request",
    description: "Error Message",
  }),
});

export const InternalServerErrorSchema = z.object({
  code: z.number().openapi({
    example: 500,
    description: "Error Code",
  }),
  error: z.string().openapi({
    example: "Internal Server Error",
    description: "Error Message",
  }),
});