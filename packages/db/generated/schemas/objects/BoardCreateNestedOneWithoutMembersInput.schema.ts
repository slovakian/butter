import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateOrConnectWithoutMembersInputObjectSchema } from "./BoardCreateOrConnectWithoutMembersInput.schema";
import { BoardCreateWithoutMembersInputObjectSchema } from "./BoardCreateWithoutMembersInput.schema";
import { BoardUncheckedCreateWithoutMembersInputObjectSchema } from "./BoardUncheckedCreateWithoutMembersInput.schema";
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
			connect: z.lazy(() => BoardWhereUniqueInputObjectSchema).optional(),
		})
		.strict();
export const BoardCreateNestedOneWithoutMembersInputObjectSchema: z.ZodType<Prisma.BoardCreateNestedOneWithoutMembersInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardCreateNestedOneWithoutMembersInput>;
export const BoardCreateNestedOneWithoutMembersInputObjectZodSchema =
	makeSchema();
