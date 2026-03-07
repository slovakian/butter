import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateManyThemeInputObjectSchema } from "./BoardCreateManyThemeInput.schema";

const makeSchema = () =>
	z
		.object({
			data: z.union([
				z.lazy(() => BoardCreateManyThemeInputObjectSchema),
				z.lazy(() => BoardCreateManyThemeInputObjectSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();
export const BoardCreateManyThemeInputEnvelopeObjectSchema: z.ZodType<Prisma.BoardCreateManyThemeInputEnvelope> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardCreateManyThemeInputEnvelope>;
export const BoardCreateManyThemeInputEnvelopeObjectZodSchema = makeSchema();
