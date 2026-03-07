import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateWithoutMembersInputObjectSchema } from "./BoardCreateWithoutMembersInput.schema";
import { BoardUncheckedCreateWithoutMembersInputObjectSchema } from "./BoardUncheckedCreateWithoutMembersInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./BoardWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => BoardWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => BoardCreateWithoutMembersInputObjectSchema),
				z.lazy(() => BoardUncheckedCreateWithoutMembersInputObjectSchema),
			]),
		})
		.strict();
export const BoardCreateOrConnectWithoutMembersInputObjectSchema: z.ZodType<Prisma.BoardCreateOrConnectWithoutMembersInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardCreateOrConnectWithoutMembersInput>;
export const BoardCreateOrConnectWithoutMembersInputObjectZodSchema =
	makeSchema();
