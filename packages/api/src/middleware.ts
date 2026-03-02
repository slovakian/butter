import { createRatelimitMiddleware } from "@orpc/experimental-ratelimit";
import { CloudflareRatelimiter } from "@orpc/experimental-ratelimit/cloudflare-ratelimit";
import { o } from ".";

export const authMiddleware = o.middleware(
	async ({ context, next, errors }) => {
		if (!context.auth.session) {
			throw errors.UNAUTHORIZED();
		}
		return next({
			context: {
				auth: {
					client: context.auth.client,
					session: context.auth.session,
				},
			},
		});
	},
);

export const rateLimiterMiddleware = o.middleware(
	createRatelimitMiddleware({
		limiter: ({ context }) => new CloudflareRatelimiter(context.env.RATE_LIMIT),
		key: ({ context }, _input) => {
			const userId = context.auth?.session?.user?.id;
			if (userId) {
				return `rate_limit:global:user:${userId}`;
			}
			const ip = context.req.headers.get("cf-connecting-ip") || "unknown-ip";
			return `rate_limit:global:ip:${ip}`;
		},
	}),
);
