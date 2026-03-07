import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationIncludeObjectSchema } from "./InvitationInclude.schema";
import { InvitationSelectObjectSchema } from "./InvitationSelect.schema";

const makeSchema = () =>
	z
		.object({
			select: z.lazy(() => InvitationSelectObjectSchema).optional(),
			include: z.lazy(() => InvitationIncludeObjectSchema).optional(),
		})
		.strict();
export const InvitationArgsObjectSchema = makeSchema();
export const InvitationArgsObjectZodSchema = makeSchema();
