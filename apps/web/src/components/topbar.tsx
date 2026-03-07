// import { BoardThemeSelector } from "@/features/themes/board-selector";

import { SignInAnonAction } from "@/features/auth/actions/sign-in-anon";
import { useAuth } from "@/features/auth/query";
import { AnonMenu } from "./topbar/anon-menu";
import UserMenu from "./user-menu";

export function TopBar() {
	const { data: session } = useAuth();

	const isAnonymous = session?.user?.isAnonymous;

	return (
		<div className="flex items-center justify-between border-topbar-border border-b bg-topbar px-2 text-topbar-foreground text-xs">
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

				{session?.user ? (
					<ul className="flex items-center gap-3">
						{isAnonymous ? (
							<AnonMenu>
								<li className="flex cursor-pointer items-center gap-1 font-bold hover:underline">
									Anon#{session.user.id}
								</li>
							</AnonMenu>
						) : (
							<UserMenu>
								<li className="flex cursor-pointer items-center gap-1 font-bold hover:underline">
									{session.user.name}
								</li>
							</UserMenu>
						)}

						{session?.user.role === "admin" && (
							<li className="flex cursor-pointer items-center gap-1 font-bold text-destructive hover:underline">
								🛡️ Admin
							</li>
						)}
						<li className="flex cursor-pointer items-center gap-1 hover:underline">
							⚙️ Settings
						</li>
					</ul>
				) : (
					<div className="flex items-center">
						<button
							type="button"
							onClick={() => {
								/* TODO: Implement regular sign-in */
							}}
							className="flex cursor-pointer items-center gap-1 hover:underline focus:outline-none"
						>
							Sign In
						</button>{" "}
						<SignInAnonAction>
							{({ openDialog }) => (
								<button
									type="button"
									onClick={openDialog}
									className="flex cursor-pointer items-center gap-1 opacity-50 hover:underline focus:outline-none"
								>
									[ as Anon ]
								</button>
							)}
						</SignInAnonAction>
					</div>
				)}
			</div>
		</div>
	);
}
