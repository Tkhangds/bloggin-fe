import { z } from "zod";

export const CreateCommentSchema = z.object({
  postId: z.string().nonempty({ message: "postId is required" }),
  content: z.string().nonempty({ message: "content is required" }),
});

export type CreateCommentDto = z.infer<typeof CreateCommentSchema>;
