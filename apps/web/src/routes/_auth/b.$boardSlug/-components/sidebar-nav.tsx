import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { api } from "@/utils/orpc";

type SidebarNavProps = {
	items: {
		id: number;
		name: string;
		slug: string;
		type: string;
	}[];
	slug: string;
};

export function SidebarNav({ items, slug }: SidebarNavProps) {
	const { data: board } = useQuery(
		api.board.getBySlug.queryOptions({
			input: {
				slug: slug,
			},
		}),
	);

	return (
		<>
			{/* HEADER */}
			<div className="flex h-8 shrink-0 items-center border-border border-b bg-muted/50 px-3 font-bold text-foreground text-xs">
				{board?.name}
			</div>

			{/* SCROLLABLE NAVIGATION */}
			<nav className="flex flex-1 flex-col gap-3 overflow-y-auto p-2">
				<details open className="group">
					<summary className="cursor-pointer select-none bg-secondary px-1 py-0.5 font-bold text-secondary-foreground text-xs uppercase">
						General
					</summary>
					<ul className="mt-1 flex flex-col gap-0.5 pl-1">
						{items.map((item) => (
							<li key={item.id}>
								<Link
									to="/b/$boardSlug/$itemSlug"
									params={{ boardSlug: slug, itemSlug: item.slug }}
									className="block cursor-pointer px-1 py-0.5 text-xs hover:bg-accent hover:text-accent-foreground"
									activeProps={{
										className: "bg-accent text-accent-foreground font-bold",
									}}
								>
									{item.type === "Chatroom" ? "💬" : "📄"} {item.name}
								</Link>
							</li>
						))}
					</ul>
				</details>
			</nav>
		</>
	);
}
