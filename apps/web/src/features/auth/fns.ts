import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "./middleware";

export const getAuth = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return context.session;
	});
