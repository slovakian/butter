import type { BoardPermissions } from "@butter/auth";
import { ORPCError } from "@orpc/server";
import { o } from ".";

export const authMiddleware = o.middleware(async ({ context, next }) => {
	if (!context.auth.session?.user) {
		throw new ORPCError("UNAUTHORIZED");
	}
	return next({
		context: {
			auth: context.auth,
		},
	});
});

export const boardPermissionsMiddleware = (permissions: BoardPermissions) =>
	authMiddleware.concat(
		async (
			{ context, next },
			input: Record<string, unknown> & { boardId: string },
		) => {
			if (!context.auth.session?.user) {
				throw new ORPCError("UNAUTHORIZED");
			}
			const hasPermission = await context.auth.client.api.hasPermission({
				headers: context.req.headers,
				body: {
					permissions,
					organizationId: input.boardId,
				},
			});
			if (!hasPermission) {
				throw new ORPCError("UNAUTHORIZED");
			}
			return next({
				context: {
					auth: context.auth,
				},
			});
		},
	);

// export const someMiddleware = (opts: SomeOpts) =>
// authMiddleware.concat( // we use auth middleware so IF a user is auth'd, the middleware can access it... keep in mind that some things related to a board can be accessed by non-logged in people as well
// 	async (
// 		{ context, next },
// 		input: { boardId: string }, // some value we extract from input
// 	) => {
// 		// some logic...
// 		return next({ // we can modify context with middleware
// 			context: {
// 				auth: context.auth,
// 			},
// 		});
// 	},
// );
