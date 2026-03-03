import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
// import { Menu } from "lucide-react";
import { TopBar } from "@/components/topbar";
// import {
// 	Drawer,
// 	DrawerContent,
// 	DrawerHeader,
// 	DrawerTitle,
// 	DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Separator } from "@/components/ui/separator";
import { DEFAULT_THEME } from "@/features/themes/constants";
import { api } from "@/utils/orpc";
import { SidebarNav } from "./-components/sidebar-nav";

export const Route = createFileRoute("/_auth/b/$boardSlug")({
	loader: async ({ context, params }) => {
		const board = await context.queryClient.ensureQueryData(
			api.board.getBySlug.queryOptions({
				input: { slug: params.boardSlug },
			}),
		);

		if (!board) {
			throw notFound();
		}

		return {
			board: {
				id: 2,
				theme: {
					id: 1,
					userId: 1,
					...DEFAULT_THEME,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			},
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { boardSlug } = Route.useParams();
	const { data: board } = useSuspenseQuery(
		api.board.getBySlug.queryOptions({
			input: { slug: boardSlug },
			staleTime: Number.POSITIVE_INFINITY,
		}),
	);

	return (
		<div className="flex h-screen w-full flex-col bg-background font-mono text-foreground">
			<TopBar />
			<div className="flex flex-1 overflow-hidden">
				{/* MOBILE DRAWER
				<div className="md:hidden">
					<Drawer>
						<DrawerTrigger asChild>
							<button
								type="button"
								className="flex cursor-pointer items-center justify-center rounded-none p-1 hover:bg-accent hover:text-accent-foreground"
							>
								<Menu className="h-4 w-4" />
							</button>
						</DrawerTrigger>
						<Separator orientation="vertical" />
						<DrawerContent className="h-[75vh] font-mono">
							<DrawerHeader className="sr-only">
								<DrawerTitle>Navigation Menu</DrawerTitle>
							</DrawerHeader>
							<div className="flex h-full flex-col overflow-hidden text-foreground">
								<SidebarNav slug={boardSlug} items={board?.items || []} />
							</div>
						</DrawerContent>
					</Drawer>
				</div> */}
				<aside className="w-56 shrink-0 flex-col border-border border-r bg-muted/30 md:flex">
					<SidebarNav slug={boardSlug} items={board?.items || []} />
				</aside>
				{/* MAIN CONTENT AREA */}
				<main className="flex min-w-0 flex-1 flex-col bg-background">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
