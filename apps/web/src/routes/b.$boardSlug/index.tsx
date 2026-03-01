import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/b/$boardSlug/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/b/$boardSlug/"!</div>;
}
