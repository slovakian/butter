import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { AccountIncludeObjectSchema } from "./AccountInclude.schema";
import { AccountSelectObjectSchema } from "./AccountSelect.schema";

const makeSchema = () =>
	z
		.object({
			select: z.lazy(() => AccountSelectObjectSchema).optional(),
			include: z.lazy(() => AccountIncludeObjectSchema).optional(),
		})
		.strict();
export const AccountArgsObjectSchema = makeSchema();
export const AccountArgsObjectZodSchema = makeSchema();
