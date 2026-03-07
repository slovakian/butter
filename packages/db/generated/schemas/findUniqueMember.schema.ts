import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberIncludeObjectSchema } from "./objects/MemberInclude.schema";
import { MemberSelectObjectSchema } from "./objects/MemberSelect.schema";
import { MemberWhereUniqueInputObjectSchema } from "./objects/MemberWhereUniqueInput.schema";

export const MemberFindUniqueSchema: z.ZodType<Prisma.MemberFindUniqueArgs> = z
	.object({
		select: MemberSelectObjectSchema.optional(),
		include: MemberIncludeObjectSchema.optional(),
		where: MemberWhereUniqueInputObjectSchema,
	})
	.strict() as unknown as z.ZodType<Prisma.MemberFindUniqueArgs>;

export const MemberFindUniqueZodSchema = z
	.object({
		select: MemberSelectObjectSchema.optional(),
		include: MemberIncludeObjectSchema.optional(),
		where: MemberWhereUniqueInputObjectSchema,
	})
	.strict();
