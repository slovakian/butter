import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateOrConnectWithoutMembersInputObjectSchema } from "./BoardCreateOrConnectWithoutMembersInput.schema";
import { BoardCreateWithoutMembersInputObjectSchema } from "./BoardCreateWithoutMembersInput.schema";
import { BoardUncheckedCreateWithoutMembersInputObjectSchema } from "./BoardUncheckedCreateWithoutMembersInput.schema";
import { BoardUncheckedUpdateWithoutMembersInputObjectSchema } from "./BoardUncheckedUpdateWithoutMembersInput.schema";
import { BoardUpdateToOneWithWhereWithoutMembersInputObjectSchema } from "./BoardUpdateToOneWithWhereWithoutMembersInput.schema";
import { BoardUpdateWithoutMembersInputObjectSchema } from "./BoardUpdateWithoutMembersInput.schema";
import { BoardUpsertWithoutMembersInputObjectSchema } from "./BoardUpsertWithoutMembersInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./BoardWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => BoardCreateWithoutMembersInputObjectSchema),
					z.lazy(() => BoardUncheckedCreateWithoutMembersInputObjectSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => BoardCreateOrConnectWithoutMembersInputObjectSchema)
				.optional(),
			upsert: z
				.lazy(() => BoardUpsertWithoutMembersInputObjectSchema)
				.optional(),
			connect: z.lazy(() => BoardWhereUniqueInputObjectSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => BoardUpdateToOneWithWhereWithoutMembersInputObjectSchema,
					),
					z.lazy(() => BoardUpdateWithoutMembersInputObjectSchema),
					z.lazy(() => BoardUncheckedUpdateWithoutMembersInputObjectSchema),
				])
				.optional(),
		})
		.strict();
export const BoardUpdateOneRequiredWithoutMembersNestedInputObjectSchema: z.ZodType<Prisma.BoardUpdateOneRequiredWithoutMembersNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateOneRequiredWithoutMembersNestedInput>;
export const BoardUpdateOneRequiredWithoutMembersNestedInputObjectZodSchema =
	makeSchema();
