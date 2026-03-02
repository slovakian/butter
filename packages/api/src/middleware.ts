import { createRatelimitMiddleware } from "@orpc/experimental-ratelimit";
import { CloudflareRatelimiter } from "@orpc/experimental-ratelimit/cloudflare-ratelimit";
import { o } from ".";

export const authMiddleware = o.middleware(
	async ({ context, next, errors }) => {
		if (!context.auth.session?.user) {
			throw errors.UNAUTHORIZED();
		}
		return next({
			context: {
				auth: context.auth,
			},
		});
	},
);

export const rateLimiterMiddleware = o.middleware(
	createRatelimitMiddleware({
		limiter: ({ context }) => new CloudflareRatelimiter(context.env.RATE_LIMIT),
		key: ({ context }, _input) => {
			// 1. Check for authenticated user
			const userId = context.auth?.session?.user?.id;
			if (userId) {
				return `rate_limit:global:user:${userId}`;
			}
			// 2. Fall back to IP for guests, although there should be none
			const ip = context.req.headers.get("cf-connecting-ip") || "unknown-ip";
			return `rate_limit:global:ip:${ip}`;
		},
	}),
);
