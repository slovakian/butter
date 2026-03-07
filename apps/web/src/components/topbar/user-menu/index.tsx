import { useRouter } from "@tanstack/react-router";
import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignInAnonAction } from "@/features/auth/actions/sign-in-anon";
import { authClient } from "@/features/auth/client";

export function UserMenu({ children }: { children: React.ReactNode }) {
	const { data: session } = authClient.useSession();
	const user = session?.user;
	const router = useRouter();

	if (!user || user.isAnonymous) return null;

	// Determine if the provided children is a valid React element (like a <button> or <a>)
	// or just a primitive/fragment (like "Click here")
	const isElement = React.isValidElement(children);

	return (
		<SignInAnonAction>
			{({ openDialog }) => (
				<DropdownMenu>
					{/* If it's an element, pass it to 'render' so Base UI can inject refs and props onto it.
                      If not, render it as normal children so the default trigger button wraps it. 
                    */}
					<DropdownMenuTrigger render={isElement ? children : undefined}>
						{!isElement && children}
					</DropdownMenuTrigger>

					<DropdownMenuContent className="w-56" align="end">
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="font-medium text-sm leading-none">{user.name}</p>
								<p className="text-muted-foreground text-xs leading-none">
									{user.email}
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onSelect={() => {
								openDialog();
							}}
						>
							Switch to Guest
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onSelect={async () => {
								await authClient.signOut();
								router.invalidate();
							}}
						>
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</SignInAnonAction>
	);
}
