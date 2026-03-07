import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateOrConnectWithoutChatroomsInputObjectSchema } from "./BoardCreateOrConnectWithoutChatroomsInput.schema";
import { BoardCreateWithoutChatroomsInputObjectSchema } from "./BoardCreateWithoutChatroomsInput.schema";
import { BoardUncheckedCreateWithoutChatroomsInputObjectSchema } from "./BoardUncheckedCreateWithoutChatroomsInput.schema";
import { BoardUncheckedUpdateWithoutChatroomsInputObjectSchema } from "./BoardUncheckedUpdateWithoutChatroomsInput.schema";
import { BoardUpdateToOneWithWhereWithoutChatroomsInputObjectSchema } from "./BoardUpdateToOneWithWhereWithoutChatroomsInput.schema";
import { BoardUpdateWithoutChatroomsInputObjectSchema } from "./BoardUpdateWithoutChatroomsInput.schema";
import { BoardUpsertWithoutChatroomsInputObjectSchema } from "./BoardUpsertWithoutChatroomsInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./BoardWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => BoardCreateWithoutChatroomsInputObjectSchema),
					z.lazy(() => BoardUncheckedCreateWithoutChatroomsInputObjectSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => BoardCreateOrConnectWithoutChatroomsInputObjectSchema)
				.optional(),
			upsert: z
				.lazy(() => BoardUpsertWithoutChatroomsInputObjectSchema)
				.optional(),
			connect: z.lazy(() => BoardWhereUniqueInputObjectSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => BoardUpdateToOneWithWhereWithoutChatroomsInputObjectSchema,
					),
					z.lazy(() => BoardUpdateWithoutChatroomsInputObjectSchema),
					z.lazy(() => BoardUncheckedUpdateWithoutChatroomsInputObjectSchema),
				])
				.optional(),
		})
		.strict();
export const BoardUpdateOneRequiredWithoutChatroomsNestedInputObjectSchema: z.ZodType<Prisma.BoardUpdateOneRequiredWithoutChatroomsNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateOneRequiredWithoutChatroomsNestedInput>;
export const BoardUpdateOneRequiredWithoutChatroomsNestedInputObjectZodSchema =
	makeSchema();
