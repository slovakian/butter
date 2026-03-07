import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomCreateOrConnectWithoutMessagesInputObjectSchema } from "./ChatroomCreateOrConnectWithoutMessagesInput.schema";
import { ChatroomCreateWithoutMessagesInputObjectSchema } from "./ChatroomCreateWithoutMessagesInput.schema";
import { ChatroomUncheckedCreateWithoutMessagesInputObjectSchema } from "./ChatroomUncheckedCreateWithoutMessagesInput.schema";
import { ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema } from "./ChatroomUncheckedUpdateWithoutMessagesInput.schema";
import { ChatroomUpdateToOneWithWhereWithoutMessagesInputObjectSchema } from "./ChatroomUpdateToOneWithWhereWithoutMessagesInput.schema";
import { ChatroomUpdateWithoutMessagesInputObjectSchema } from "./ChatroomUpdateWithoutMessagesInput.schema";
import { ChatroomUpsertWithoutMessagesInputObjectSchema } from "./ChatroomUpsertWithoutMessagesInput.schema";
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
			upsert: z
				.lazy(() => ChatroomUpsertWithoutMessagesInputObjectSchema)
				.optional(),
			connect: z.lazy(() => ChatroomWhereUniqueInputObjectSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => ChatroomUpdateToOneWithWhereWithoutMessagesInputObjectSchema,
					),
					z.lazy(() => ChatroomUpdateWithoutMessagesInputObjectSchema),
					z.lazy(() => ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema),
				])
				.optional(),
		})
		.strict();
export const ChatroomUpdateOneRequiredWithoutMessagesNestedInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateOneRequiredWithoutMessagesNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateOneRequiredWithoutMessagesNestedInput>;
export const ChatroomUpdateOneRequiredWithoutMessagesNestedInputObjectZodSchema =
	makeSchema();
