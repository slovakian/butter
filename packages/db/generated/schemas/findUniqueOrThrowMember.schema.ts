import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberIncludeObjectSchema } from "./objects/MemberInclude.schema";
import { MemberSelectObjectSchema } from "./objects/MemberSelect.schema";
import { MemberWhereUniqueInputObjectSchema } from "./objects/MemberWhereUniqueInput.schema";

export const MemberFindUniqueOrThrowSchema: z.ZodType<Prisma.MemberFindUniqueOrThrowArgs> =
	z
		.object({
			select: MemberSelectObjectSchema.optional(),
			include: MemberIncludeObjectSchema.optional(),
			where: MemberWhereUniqueInputObjectSchema,
		})
		.strict() as unknown as z.ZodType<Prisma.MemberFindUniqueOrThrowArgs>;

export const MemberFindUniqueOrThrowZodSchema = z
	.object({
		select: MemberSelectObjectSchema.optional(),
		include: MemberIncludeObjectSchema.optional(),
		where: MemberWhereUniqueInputObjectSchema,
	})
	.strict();
