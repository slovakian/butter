import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import Header from "@/components/header";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { WelcomeDialog } from "@/components/welcome-dialog";
import { api } from "@/utils/orpc";

export const Route = createFileRoute("/_auth/")({
	component: HomeComponent,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(api.board.list.queryOptions());
	},
});

const TITLE_TEXT = `
 ▄▄▄▄    █    ██ ▄▄▄█████▓▄▄▄█████▓▓█████  ██▀███  
▓█████▄  ██  ▓██▒▓  ██▒ ▓▒▓  ██▒ ▓▒▓█   ▀ ▓██ ▒ ██▒
▒██▒ ▄██▓██  ▒██░▒ ▓██░ ▒░▒ ▓██░ ▒░▒███   ▓██ ░▄█ ▒
▒██░█▀  ▓▓█  ░██░░ ▓██▓ ░ ░ ▓██▓ ░ ▒▓█  ▄ ▒██▀▀█▄  
░▓█  ▀█▓▒▒█████▓   ▒██▒ ░   ▒██▒ ░ ░▒████▒░██▓ ▒██▒
░▒▓███▀▒░▒▓▒ ▒ ▒   ▒ ░░     ▒ ░░   ░░ ▒░ ░░ ▒▓ ░▒▓░
▒░▒   ░ ░░▒░ ░ ░     ░        ░     ░ ░  ░  ░▒ ░ ▒░
 ░    ░  ░░░ ░ ░   ░        ░         ░     ░░   ░ 
 ░         ░                          ░  ░   ░     
      ░
`.trim();

function HomeComponent() {
	const { data: boards } = useQuery(api.board.list.queryOptions());

	return (
		<>
			<WelcomeDialog />
			<Header />
			<div className="container mx-auto max-w-4xl space-y-8 px-4 py-8">
				<pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>

				<section className="rounded-lg border p-6">
					<h2 className="mb-4 font-semibold text-xl">Boards</h2>
					<Table>
						<TableCaption>Overview of all boards.</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead className="text-right">Created At</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{boards?.map((board) => (
								<TableRow key={board.id}>
									<TableCell className="font-medium">
										<Link
											to="/b/$boardSlug"
											params={{ boardSlug: board.slug }}
											className="text-blue-600 hover:underline"
										>
											{board.name}
										</Link>
									</TableCell>
									<TableCell className="text-right">
										{new Date(board.createdAt).toLocaleDateString()}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</section>
			</div>
		</>
	);
}
