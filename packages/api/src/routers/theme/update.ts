import {
	themeInsertSchema,
	themeSchema,
	themeVariablesSchema,
} from "@butter/shared";
import { z } from "zod";
import { protectedProcedure } from "../../procedures";

export const updateTheme = protectedProcedure
	.input(
		z.object({
			...themeInsertSchema.partial().omit({ variables: true }).shape,
			variables: themeVariablesSchema.partial().optional(),
			id: themeSchema.shape.id,
		}),
	)
	.handler(async ({ input, context, errors }) => {
		const { db, auth } = context;
		const userId = Number(auth.session.user.id);
		const { id, variables, ...data } = input;

		const theme = await db.theme.findUnique({
			where: { id },
		});

		if (!theme) {
			throw errors.NOT_FOUND({
				message: "Theme not found",
				data: {
					resource: "Theme",
				},
			});
		}

		if (theme.userId !== userId) {
			throw errors.FORBIDDEN({
				message: "You are not the owner of this theme",
			});
		}

		let newVariables: z.infer<typeof themeVariablesSchema> | undefined;

		if (variables) {
			const currentVariables =
				(theme.variables as z.infer<typeof themeVariablesSchema>) || {};
			newVariables = {
				...currentVariables,
				...variables,
			};

			if (!newVariables.radius) {
				newVariables.radius = "0.5";
			}
		}

		const updatedTheme = await db.theme.update({
			where: { id },
			data: {
				...data,
				...(newVariables
					? {
							variables: newVariables as Required<
								z.infer<typeof themeVariablesSchema>
							>,
						}
					: {}),
			},
		});

		return updatedTheme;
	});
