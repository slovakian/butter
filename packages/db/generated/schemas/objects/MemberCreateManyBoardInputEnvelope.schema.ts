import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MemberCreateManyBoardInputObjectSchema } from "./MemberCreateManyBoardInput.schema";

const makeSchema = () =>
	z
		.object({
			data: z.union([
				z.lazy(() => MemberCreateManyBoardInputObjectSchema),
				z.lazy(() => MemberCreateManyBoardInputObjectSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();
export const MemberCreateManyBoardInputEnvelopeObjectSchema: z.ZodType<Prisma.MemberCreateManyBoardInputEnvelope> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberCreateManyBoardInputEnvelope>;
export const MemberCreateManyBoardInputEnvelopeObjectZodSchema = makeSchema();
