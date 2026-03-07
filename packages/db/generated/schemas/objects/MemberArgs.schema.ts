import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MemberIncludeObjectSchema } from "./MemberInclude.schema";
import { MemberSelectObjectSchema } from "./MemberSelect.schema";

const makeSchema = () =>
	z
		.object({
			select: z.lazy(() => MemberSelectObjectSchema).optional(),
			include: z.lazy(() => MemberIncludeObjectSchema).optional(),
		})
		.strict();
export const MemberArgsObjectSchema = makeSchema();
export const MemberArgsObjectZodSchema = makeSchema();
