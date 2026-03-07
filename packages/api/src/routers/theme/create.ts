import { themeInsertSchema } from "@butter/shared";
import { protectedProcedure } from "../../procedures";

export const createTheme = protectedProcedure
	.input(themeInsertSchema.omit({ userId: true }))
	.handler(async ({ input, context }) => {
		const { db, auth } = context;
		const userId = Number(auth.session.user.id);

		const variables = {
			...input.variables,
			radius: input.variables.radius ?? "0.5",
		};

		const theme = await db.theme.create({
			data: {
				name: input.name,
				isDark: input.isDark,
				variables,
				userId,
			},
		});

		return theme;
	});
