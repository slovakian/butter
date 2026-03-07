import { createMiddleware } from "@tanstack/react-start";
import { authClient } from "./client";

export const authMiddleware = createMiddleware().server(
	async ({ next, request }) => {
		console.log("authMiddleware: headers", request.headers);
		const { data: session } = await authClient.getSession({
			fetchOptions: {
				headers: request.headers,
			},
		});
		console.log("server authMiddleware: session ====", session);
		return next({
			context: { session },
		});
	},
);
