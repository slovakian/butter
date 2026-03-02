import { BoardThemeSelector } from "@/features/themes/board-selector";

export function TopBar({ boardId }: { boardId?: string }) {
	return (
		<div className="flex items-center justify-between border-border border-b bg-accent px-2 text-accent-foreground text-xs">
			<div className="flex items-center gap-2">
				<span className="text-base">🧈</span>
			</div>
			<div className="flex items-center gap-4">
				{boardId && (
					<BoardThemeSelector boardId={boardId}>
						{({ openDialog }) => (
							<button
								type="button"
								onClick={openDialog}
								className="flex cursor-pointer items-center gap-1 hover:underline focus:outline-none"
							>
								🌓 Theme
							</button>
						)}
					</BoardThemeSelector>
				)}
				<ul className="flex items-center gap-3">
					<li className="flex cursor-pointer items-center gap-1 font-bold text-destructive hover:underline">
						🛡️ Admin
					</li>
					<li className="flex cursor-pointer items-center gap-1 hover:underline">
						⚙️ Settings
					</li>
				</ul>
			</div>
		</div>
	);
}
