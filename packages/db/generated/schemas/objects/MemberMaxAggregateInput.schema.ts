import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.literal(true).optional(),
			boardId: z.literal(true).optional(),
			userId: z.literal(true).optional(),
			role: z.literal(true).optional(),
			createdAt: z.literal(true).optional(),
		})
		.strict();
export const MemberMaxAggregateInputObjectSchema: z.ZodType<Prisma.MemberMaxAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberMaxAggregateInputType>;
export const MemberMaxAggregateInputObjectZodSchema = makeSchema();
