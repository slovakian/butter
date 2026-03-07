import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ChatroomWhereInputObjectSchema as ChatroomWhereInputObjectSchema } from './ChatroomWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatroomWhereInputObjectSchema).optional()
}).strict();
export const BoardCountOutputTypeCountChatroomsArgsObjectSchema = makeSchema();
export const BoardCountOutputTypeCountChatroomsArgsObjectZodSchema = makeSchema();
