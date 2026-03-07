import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationWhereInputObjectSchema } from "./InvitationWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => InvitationWhereInputObjectSchema).optional(),
		})
		.strict();
export const BoardCountOutputTypeCountInvitationsArgsObjectSchema =
	makeSchema();
export const BoardCountOutputTypeCountInvitationsArgsObjectZodSchema =
	makeSchema();
