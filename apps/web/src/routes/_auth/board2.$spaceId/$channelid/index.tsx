import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/board2/$spaceId/$channelid/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/space/$spaceId/$channelid/"!</div>;
}
