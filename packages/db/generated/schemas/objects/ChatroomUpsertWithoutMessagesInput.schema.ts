import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomCreateWithoutMessagesInputObjectSchema } from "./ChatroomCreateWithoutMessagesInput.schema";
import { ChatroomUncheckedCreateWithoutMessagesInputObjectSchema } from "./ChatroomUncheckedCreateWithoutMessagesInput.schema";
import { ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema } from "./ChatroomUncheckedUpdateWithoutMessagesInput.schema";
import { ChatroomUpdateWithoutMessagesInputObjectSchema } from "./ChatroomUpdateWithoutMessagesInput.schema";
import { ChatroomWhereInputObjectSchema } from "./ChatroomWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			update: z.union([
				z.lazy(() => ChatroomUpdateWithoutMessagesInputObjectSchema),
				z.lazy(() => ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => ChatroomCreateWithoutMessagesInputObjectSchema),
				z.lazy(() => ChatroomUncheckedCreateWithoutMessagesInputObjectSchema),
			]),
			where: z.lazy(() => ChatroomWhereInputObjectSchema).optional(),
		})
		.strict();
export const ChatroomUpsertWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatroomUpsertWithoutMessagesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpsertWithoutMessagesInput>;
export const ChatroomUpsertWithoutMessagesInputObjectZodSchema = makeSchema();
