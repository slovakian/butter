import { publicProcedure } from "../../procedures";

export const list = publicProcedure.handler(async ({ context }) => {
	const boards = await context.db.board.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return boards;
});
