import { CreateFollowSchema } from './create-follow.dto';
import { z } from 'zod';

export type RemoveFollowDto = z.infer<typeof CreateFollowSchema>;
