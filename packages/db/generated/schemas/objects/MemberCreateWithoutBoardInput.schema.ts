import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateNestedOneWithoutMembersInputObjectSchema } from "./UserCreateNestedOneWithoutMembersInput.schema";

const makeSchema = () =>
	z
		.object({
			role: z.string().optional(),
			createdAt: z.coerce.date(),
			user: z.lazy(() => UserCreateNestedOneWithoutMembersInputObjectSchema),
		})
		.strict();
export const MemberCreateWithoutBoardInputObjectSchema: z.ZodType<Prisma.MemberCreateWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberCreateWithoutBoardInput>;
export const MemberCreateWithoutBoardInputObjectZodSchema = makeSchema();
