import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema } from "./ChatroomUncheckedUpdateWithoutMessagesInput.schema";
import { ChatroomUpdateWithoutMessagesInputObjectSchema } from "./ChatroomUpdateWithoutMessagesInput.schema";
import { ChatroomWhereInputObjectSchema } from "./ChatroomWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ChatroomWhereInputObjectSchema).optional(),
			data: z.union([
				z.lazy(() => ChatroomUpdateWithoutMessagesInputObjectSchema),
				z.lazy(() => ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema),
			]),
		})
		.strict();
export const ChatroomUpdateToOneWithWhereWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateToOneWithWhereWithoutMessagesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateToOneWithWhereWithoutMessagesInput>;
export const ChatroomUpdateToOneWithWhereWithoutMessagesInputObjectZodSchema =
	makeSchema();
