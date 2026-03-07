import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.literal(true).optional(),
		})
		.strict();
export const VerificationSumAggregateInputObjectSchema: z.ZodType<Prisma.VerificationSumAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.VerificationSumAggregateInputType>;
export const VerificationSumAggregateInputObjectZodSchema = makeSchema();
