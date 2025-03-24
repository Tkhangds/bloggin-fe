import { z } from 'zod';

export const CreateFollowSchema = z.object({
  authorId: z.string().nonempty({ message: 'authorId is required' }),
});

export type CreateFollowDto = z.infer<typeof CreateFollowSchema>;
