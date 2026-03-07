import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageCreateWithoutUserInputObjectSchema } from "./MessageCreateWithoutUserInput.schema";
import { MessageUncheckedCreateWithoutUserInputObjectSchema } from "./MessageUncheckedCreateWithoutUserInput.schema";
import { MessageWhereUniqueInputObjectSchema } from "./MessageWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => MessageCreateWithoutUserInputObjectSchema),
				z.lazy(() => MessageUncheckedCreateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const MessageCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageCreateOrConnectWithoutUserInput>;
export const MessageCreateOrConnectWithoutUserInputObjectZodSchema =
	makeSchema();
