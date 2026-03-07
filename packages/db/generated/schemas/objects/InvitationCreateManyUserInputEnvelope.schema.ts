import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationCreateManyUserInputObjectSchema } from "./InvitationCreateManyUserInput.schema";

const makeSchema = () =>
	z
		.object({
			data: z.union([
				z.lazy(() => InvitationCreateManyUserInputObjectSchema),
				z.lazy(() => InvitationCreateManyUserInputObjectSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();
export const InvitationCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.InvitationCreateManyUserInputEnvelope> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateManyUserInputEnvelope>;
export const InvitationCreateManyUserInputEnvelopeObjectZodSchema =
	makeSchema();
