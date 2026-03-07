import { createFileRoute, Outlet } from "@tanstack/react-router";
import { authQueryOptions } from "@/features/auth/query";

export const Route = createFileRoute("/_auth")({
	beforeLoad: async ({ context }) => {
		const session = await context.queryClient.ensureQueryData(authQueryOptions);
		console.log("server: session ===", session);
		return { session };
	},
	component: Outlet,
});
