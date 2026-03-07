import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateNestedOneWithoutMembersInputObjectSchema } from "./BoardCreateNestedOneWithoutMembersInput.schema";

const makeSchema = () =>
	z
		.object({
			role: z.string().optional(),
			createdAt: z.coerce.date(),
			board: z.lazy(() => BoardCreateNestedOneWithoutMembersInputObjectSchema),
		})
		.strict();
export const MemberCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.MemberCreateWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberCreateWithoutUserInput>;
export const MemberCreateWithoutUserInputObjectZodSchema = makeSchema();
