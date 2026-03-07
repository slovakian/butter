import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.literal(true).optional(),
			userId: z.literal(true).optional(),
		})
		.strict();
export const AccountAvgAggregateInputObjectSchema: z.ZodType<Prisma.AccountAvgAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.AccountAvgAggregateInputType>;
export const AccountAvgAggregateInputObjectZodSchema = makeSchema();
