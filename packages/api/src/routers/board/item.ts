import { z } from "zod";
import { publicProcedure } from "../../procedures";

export const getBySlug = publicProcedure
	.input(
		z.object({
			boardSlug: z.string(),
			itemSlug: z.string(),
		}),
	)
	.handler(async ({ input, context, errors }) => {
		const item = await context.db.item.findFirst({
			where: {
				slug: input.itemSlug,
				board: {
					slug: input.boardSlug,
				},
			},
		});

		if (!item) {
			throw errors.NOT_FOUND({
				message: "Item not found",
				data: {
					resource: "Item",
				},
			});
		}

		return item;
	});

export const itemRouter = {
	getBySlug,
};
