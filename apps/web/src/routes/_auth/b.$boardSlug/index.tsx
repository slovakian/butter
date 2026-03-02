import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/b/$boardSlug/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/b/$boardSlug/"!</div>;
}
