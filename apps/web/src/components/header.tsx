import { Link } from "@tanstack/react-router";

import { AnonMenu } from "@/components/topbar/anon-menu";
import { UserMenu } from "@/components/topbar/user-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/query";

export default function Header() {
	const { data: session, isPending } = useAuth();

	const links = [
		{ to: "/", label: "Home" },
		{ to: "/dashboard", label: "Dashboard" },
		{ to: "/todos", label: "Todos" },
	] as const;

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-1">
				{/* Left side: Logo + Nav */}
				<div className="flex items-center gap-6">
					{/* Logo Link */}
					<Link
						to="/"
						className="flex items-center transition-opacity hover:opacity-80"
					>
						{/* OPTION 1: CDN Image (Apple Style) */}
						<img
							src="https://em-content.zobj.net/source/apple/391/butter_1f9c8.png"
							alt="Butter Logo"
							className="h-8 w-8 drop-shadow-sm"
						/>

						{/* OPTION 2: Regular Plain Emoji */}
						{/* <span className="text-3xl" role="img" aria-label="butter logo">🧈</span> */}
					</Link>

					<nav className="flex gap-4">
						{links.map(({ to, label }) => {
							return (
								// @ts-expect-error - Route types might be incomplete
								<Link key={to} to={to}>
									{label}
								</Link>
							);
						})}
					</nav>
				</div>

				{/* Right side: User Menu */}
				<div className="flex items-center gap-2">
					{isPending ? (
						<Skeleton className="h-9 w-24" />
					) : session?.user ? (
						session.user.isAnonymous ? (
							<AnonMenu>anon user</AnonMenu>
						) : (
							<UserMenu>user menu</UserMenu>
						)
					) : (
						<Link to="/login">
							<Button variant="outline">Sign In</Button>
						</Link>
					)}
				</div>
			</div>
			<hr />
		</div>
	);
}
