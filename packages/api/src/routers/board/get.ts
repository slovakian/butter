import { z } from "zod";
import { publicProcedure } from "../../procedures";

export const getBySlug = publicProcedure
	.input(z.object({ slug: z.string() }))
	.handler(async ({ input, context, errors }) => {
		const board = await context.db.board.findUnique({
			where: { slug: input.slug },
			include: {
				items: true,
			},
		});

		if (!board) {
			throw errors.NOT_FOUND({
				message: "Board not found",
				data: {
					resource: "Board",
				},
			});
		}

		return board;
	});
