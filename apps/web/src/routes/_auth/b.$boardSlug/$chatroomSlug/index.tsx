import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/utils/orpc";
import { Chatroom } from "./-chatroom";

export const Route = createFileRoute("/_auth/b/$boardSlug/$chatroomSlug/")({
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(
			api.board.chatroom.getBySlug.queryOptions({
				input: {
					boardSlug: params.boardSlug,
					chatroomSlug: params.chatroomSlug,
				},
			}),
		);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();

	return (
		<Chatroom boardSlug={params.boardSlug} chatroomSlug={params.chatroomSlug} />
	);
}
