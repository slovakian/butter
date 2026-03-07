import * as z from "zod";
// prettier-ignore
export const BoardModelSchema = z
	.object({
		id: z.number().int(),
		name: z.string(),
		slug: z.string(),
		logo: z.string().nullable(),
		isOfficial: z.boolean(),
		createdAt: z.date(),
		metadata: z.string(),
		members: z.array(z.unknown()),
		invitations: z.array(z.unknown()),
		themeId: z.number().int().nullable(),
		theme: z.unknown().nullable(),
		chatrooms: z.array(z.unknown()),
	})
	.strict();

export type BoardPureType = z.infer<typeof BoardModelSchema>;
