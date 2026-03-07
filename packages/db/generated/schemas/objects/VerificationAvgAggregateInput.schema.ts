import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.literal(true).optional(),
		})
		.strict();
export const VerificationAvgAggregateInputObjectSchema: z.ZodType<Prisma.VerificationAvgAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.VerificationAvgAggregateInputType>;
export const VerificationAvgAggregateInputObjectZodSchema = makeSchema();
