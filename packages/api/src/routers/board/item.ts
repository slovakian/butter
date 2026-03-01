import { ORPCError } from "@orpc/server";
import { z } from "zod";
import { publicProcedure } from "../../procedures";

export const getBySlug = publicProcedure
	.input(
		z.object({
			boardSlug: z.string(),
			itemSlug: z.string(),
		}),
	)
	.handler(async ({ input, context }) => {
		const item = await context.db.item.findFirst({
			where: {
				slug: input.itemSlug,
				board: {
					slug: input.boardSlug,
				},
			},
		});

		if (!item) {
			throw new ORPCError("NOT_FOUND", {
				message: "Item not found",
			});
		}

		return item;
	});

export const itemRouter = {
	getBySlug,
};
