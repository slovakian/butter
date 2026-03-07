import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberWhereInputObjectSchema } from "./objects/MemberWhereInput.schema";

export const MemberDeleteManySchema: z.ZodType<Prisma.MemberDeleteManyArgs> = z
	.object({ where: MemberWhereInputObjectSchema.optional() })
	.strict() as unknown as z.ZodType<Prisma.MemberDeleteManyArgs>;

export const MemberDeleteManyZodSchema = z
	.object({ where: MemberWhereInputObjectSchema.optional() })
	.strict();
