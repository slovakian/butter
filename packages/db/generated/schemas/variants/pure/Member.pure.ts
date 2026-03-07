import * as z from "zod";
// prettier-ignore
export const MemberModelSchema = z
	.object({
		id: z.number().int(),
		boardId: z.number().int(),
		board: z.unknown(),
		userId: z.number().int(),
		user: z.unknown(),
		role: z.string(),
		createdAt: z.date(),
	})
	.strict();

export type MemberPureType = z.infer<typeof MemberModelSchema>;
