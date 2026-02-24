import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getAuth } from "@/features/auth/fns";

export const Route = createFileRoute("/_auth")({
	beforeLoad: async () => {
		const auth = await getAuth();
		return { auth };
	},
	component: Outlet,
});
