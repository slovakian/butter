import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.literal(true).optional(),
			userId: z.literal(true).optional(),
		})
		.strict();
export const SessionAvgAggregateInputObjectSchema: z.ZodType<Prisma.SessionAvgAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.SessionAvgAggregateInputType>;
export const SessionAvgAggregateInputObjectZodSchema = makeSchema();
