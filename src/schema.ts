import { z } from "@hono/zod-openapi";

export const IdSchema = z.object({
  user_id: z.string().openapi({
    param: {
      name: "user_id",
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
  error: z.string().openapi({
    example: "Not Found",
    description: "Error Message",
  }),
});

export const BadRequestSchema = z.object({
  error: z.string().openapi({
    example: "Bad Request",
    description: "Error Message",
  }),
});

export const InternalServerErrorSchema = z.object({
  error: z.string().openapi({
    example: "Internal Server Error",
    description: "Error Message",
  }),
});

export const ResponseSchema = z.object({
  data: z.any().openapi({ description: "Response Data" }),
  error: z.union([z.string(), z.null()]).openapi({
    example: "Error Message",
    description: "Error Message or null if no error occurred",
  }),
});