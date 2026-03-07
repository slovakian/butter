import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageCreateWithoutChatroomInputObjectSchema } from "./MessageCreateWithoutChatroomInput.schema";
import { MessageUncheckedCreateWithoutChatroomInputObjectSchema } from "./MessageUncheckedCreateWithoutChatroomInput.schema";
import { MessageUncheckedUpdateWithoutChatroomInputObjectSchema } from "./MessageUncheckedUpdateWithoutChatroomInput.schema";
import { MessageUpdateWithoutChatroomInputObjectSchema } from "./MessageUpdateWithoutChatroomInput.schema";
import { MessageWhereUniqueInputObjectSchema } from "./MessageWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
			update: z.union([
				z.lazy(() => MessageUpdateWithoutChatroomInputObjectSchema),
				z.lazy(() => MessageUncheckedUpdateWithoutChatroomInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => MessageCreateWithoutChatroomInputObjectSchema),
				z.lazy(() => MessageUncheckedCreateWithoutChatroomInputObjectSchema),
			]),
		})
		.strict();
export const MessageUpsertWithWhereUniqueWithoutChatroomInputObjectSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutChatroomInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutChatroomInput>;
export const MessageUpsertWithWhereUniqueWithoutChatroomInputObjectZodSchema =
	makeSchema();
