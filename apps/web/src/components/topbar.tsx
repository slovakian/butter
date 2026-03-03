// import { BoardThemeSelector } from "@/features/themes/board-selector";

export function TopBar() {
	return (
		<div className="flex items-center justify-between border-b border-topbar-border bg-topbar px-2 text-xs text-topbar-foreground">
			<div className="flex items-center gap-2">
				<span className="text-base">🧈</span>
			</div>
			<div className="flex items-center gap-4">
				{/* <BoardThemeSelector>
					{({ openDialog }) => (
						<button
							type="button"
							onClick={openDialog}
							className="flex cursor-pointer items-center gap-1 hover:underline focus:outline-none"
						>
							🌓 Theme
						</button>
					)}
				</BoardThemeSelector> */}
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
