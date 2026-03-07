import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomWhereInputObjectSchema } from "./ChatroomWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ChatroomWhereInputObjectSchema).optional(),
		})
		.strict();
export const BoardCountOutputTypeCountChatroomsArgsObjectSchema = makeSchema();
export const BoardCountOutputTypeCountChatroomsArgsObjectZodSchema =
	makeSchema();
