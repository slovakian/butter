import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomCreateWithoutMessagesInputObjectSchema } from "./ChatroomCreateWithoutMessagesInput.schema";
import { ChatroomUncheckedCreateWithoutMessagesInputObjectSchema } from "./ChatroomUncheckedCreateWithoutMessagesInput.schema";
import { ChatroomWhereUniqueInputObjectSchema } from "./ChatroomWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ChatroomWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => ChatroomCreateWithoutMessagesInputObjectSchema),
				z.lazy(() => ChatroomUncheckedCreateWithoutMessagesInputObjectSchema),
			]),
		})
		.strict();
export const ChatroomCreateOrConnectWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatroomCreateOrConnectWithoutMessagesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomCreateOrConnectWithoutMessagesInput>;
export const ChatroomCreateOrConnectWithoutMessagesInputObjectZodSchema =
	makeSchema();
