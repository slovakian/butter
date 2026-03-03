import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/utils/orpc";
// import { Chatroom } from "./-chatroom";

export const Route = createFileRoute("/_auth/b/$boardSlug/$itemSlug/")({
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(
			api.board.item.getBySlug.queryOptions({
				input: {
					boardSlug: params.boardSlug,
					itemSlug: params.itemSlug,
				},
			}),
		);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();

	const { data: item } = useSuspenseQuery(
		api.board.item.getBySlug.queryOptions({
			input: {
				boardSlug: params.boardSlug,
				itemSlug: params.itemSlug,
			},
			staleTime: Number.POSITIVE_INFINITY,
		}),
	);

	return (
		<div className="p-4">
			<h2 className="font-bold text-xl">Item: {item?.name}</h2>
			<div className="mt-2 rounded bg-gray-50 p-4 text-gray-500">
				This is a generic view for item type: {item?.type}
			</div>
		</div>
	);
}
