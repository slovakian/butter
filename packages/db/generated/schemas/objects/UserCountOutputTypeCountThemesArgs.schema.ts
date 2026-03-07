import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeWhereInputObjectSchema } from "./ThemeWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ThemeWhereInputObjectSchema).optional(),
		})
		.strict();
export const UserCountOutputTypeCountThemesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountThemesArgsObjectZodSchema = makeSchema();
