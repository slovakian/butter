import * as z from "zod";
// prettier-ignore
export const MemberResultSchema = z
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

export type MemberResultType = z.infer<typeof MemberResultSchema>;
