import * as z from "zod";
export const MemberDeleteResultSchema = z.nullable(
	z.object({
		id: z.number().int(),
		boardId: z.number().int(),
		board: z.unknown(),
		userId: z.number().int(),
		user: z.unknown(),
		role: z.string(),
		createdAt: z.date(),
	}),
);
