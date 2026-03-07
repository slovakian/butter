import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageUncheckedUpdateWithoutChatroomInputObjectSchema } from "./MessageUncheckedUpdateWithoutChatroomInput.schema";
import { MessageUpdateWithoutChatroomInputObjectSchema } from "./MessageUpdateWithoutChatroomInput.schema";
import { MessageWhereUniqueInputObjectSchema } from "./MessageWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => MessageUpdateWithoutChatroomInputObjectSchema),
				z.lazy(() => MessageUncheckedUpdateWithoutChatroomInputObjectSchema),
			]),
		})
		.strict();
export const MessageUpdateWithWhereUniqueWithoutChatroomInputObjectSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutChatroomInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutChatroomInput>;
export const MessageUpdateWithWhereUniqueWithoutChatroomInputObjectZodSchema =
	makeSchema();
