import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutAction } from "@/features/auth/actions/sign-out";

export function AnonMenu({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const isChildrenValid = React.isValidElement(children);

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger render={isChildrenValid ? children : undefined} />
			<DropdownMenuContent align="end">
				<DropdownMenuItem>
					<Link to="/login">Sign in & merge</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link to="/login">Sign in</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<SignOutAction onSuccess={() => setIsOpen(false)}>
					{({ prompt }) => (
						<DropdownMenuItem onClick={prompt} closeOnClick={false}>
							Sign out
						</DropdownMenuItem>
					)}
				</SignOutAction>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
