import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageCreateWithoutChatroomInputObjectSchema } from "./MessageCreateWithoutChatroomInput.schema";
import { MessageUncheckedCreateWithoutChatroomInputObjectSchema } from "./MessageUncheckedCreateWithoutChatroomInput.schema";
import { MessageWhereUniqueInputObjectSchema } from "./MessageWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => MessageCreateWithoutChatroomInputObjectSchema),
				z.lazy(() => MessageUncheckedCreateWithoutChatroomInputObjectSchema),
			]),
		})
		.strict();
export const MessageCreateOrConnectWithoutChatroomInputObjectSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutChatroomInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageCreateOrConnectWithoutChatroomInput>;
export const MessageCreateOrConnectWithoutChatroomInputObjectZodSchema =
	makeSchema();
