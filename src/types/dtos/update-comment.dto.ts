import { z } from 'zod';

export const UpdateCommentSchema = z.object({
  content: z.string().nonempty({ message: 'content is required' }),
});

export type UpdateCommentDto = z.infer<typeof UpdateCommentSchema>;
