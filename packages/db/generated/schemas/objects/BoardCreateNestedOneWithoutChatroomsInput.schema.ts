import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateOrConnectWithoutChatroomsInputObjectSchema } from "./BoardCreateOrConnectWithoutChatroomsInput.schema";
import { BoardCreateWithoutChatroomsInputObjectSchema } from "./BoardCreateWithoutChatroomsInput.schema";
import { BoardUncheckedCreateWithoutChatroomsInputObjectSchema } from "./BoardUncheckedCreateWithoutChatroomsInput.schema";
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
			connect: z.lazy(() => BoardWhereUniqueInputObjectSchema).optional(),
		})
		.strict();
export const BoardCreateNestedOneWithoutChatroomsInputObjectSchema: z.ZodType<Prisma.BoardCreateNestedOneWithoutChatroomsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardCreateNestedOneWithoutChatroomsInput>;
export const BoardCreateNestedOneWithoutChatroomsInputObjectZodSchema =
	makeSchema();
