import { z } from "@hono/zod-openapi";

export const IdSchema = z.object({
  id: z.string().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: "Dify system User ID",
  }),
});

export const PayloadSchema = z.object({
  user_id: z
      .string()
      .openapi({
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
    user_id: z
      .string()
      .openapi({
        example: "xxxx-xxx-xxx-xxxx",
        description: "User ID From Dify",
      }),
    user_name: z
      .string()
      .openapi({ example: "John Doe", description: "User Name" }),
  })
  .openapi("User");
