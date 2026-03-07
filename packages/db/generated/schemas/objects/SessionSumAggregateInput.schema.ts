import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.literal(true).optional(),
			userId: z.literal(true).optional(),
		})
		.strict();
export const SessionSumAggregateInputObjectSchema: z.ZodType<Prisma.SessionSumAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.SessionSumAggregateInputType>;
export const SessionSumAggregateInputObjectZodSchema = makeSchema();
