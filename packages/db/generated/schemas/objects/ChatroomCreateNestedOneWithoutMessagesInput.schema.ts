import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomCreateOrConnectWithoutMessagesInputObjectSchema } from "./ChatroomCreateOrConnectWithoutMessagesInput.schema";
import { ChatroomCreateWithoutMessagesInputObjectSchema } from "./ChatroomCreateWithoutMessagesInput.schema";
import { ChatroomUncheckedCreateWithoutMessagesInputObjectSchema } from "./ChatroomUncheckedCreateWithoutMessagesInput.schema";
import { ChatroomWhereUniqueInputObjectSchema } from "./ChatroomWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => ChatroomCreateWithoutMessagesInputObjectSchema),
					z.lazy(() => ChatroomUncheckedCreateWithoutMessagesInputObjectSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => ChatroomCreateOrConnectWithoutMessagesInputObjectSchema)
				.optional(),
			connect: z.lazy(() => ChatroomWhereUniqueInputObjectSchema).optional(),
		})
		.strict();
export const ChatroomCreateNestedOneWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatroomCreateNestedOneWithoutMessagesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomCreateNestedOneWithoutMessagesInput>;
export const ChatroomCreateNestedOneWithoutMessagesInputObjectZodSchema =
	makeSchema();
