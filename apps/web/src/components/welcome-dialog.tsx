import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/features/auth/query";

// 1. Create the isomorphic function to safely split environments
export const getHasVisited = createIsomorphicFn()
	.server(() => {
		// Server-side: safely reads from the request context
		return !!getCookie("butt3r.visited");
	})
	.client(() => {
		// Client-side: reads synchronously from the browser
		return document.cookie.includes("butt3r.visited=true");
	});

export function setHasVisitedClient() {
	// 1 year max-age, available across the whole site
	document.cookie = "butt3r.visited=true; max-age=31536000; path=/";
}

export function WelcomeDialog() {
	const { data: auth } = useAuth();

	// 2. Synchronously check state using the isomorphic function
	const shouldShow = !auth?.user && !getHasVisited();

	// We only need state to handle the user closing the modal locally
	const [isOpen, setIsOpen] = useState(shouldShow);

	const handleDismiss = () => {
		setIsOpen(false);
		setHasVisitedClient(); // Set it directly in the browser
	};

	// Bail early if we shouldn't show it (prevents rendering the Dialog tree entirely)
	if (!shouldShow) return null;

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle className="font-bold text-2xl tracking-tight">
						Welcome to butt3r
					</DialogTitle>
					<DialogDescription className="mt-2 space-y-4 text-base text-foreground/80">
						<p>
							<strong>butt3r</strong> is an online forum and knowledge base
							built for focused, topic-driven communities.
						</p>
						<p>
							You can explore boards dedicated to specific themes, each equipped
							with its own chatrooms and text pages. For example, you might drop
							into <code>/b/dev</code> to debate TypeScript versus Bun, visit{" "}
							<code>/b/climbing</code> for beta on anchor building, or jump into{" "}
							<code>/b/cooking</code> to share tips on seasoning carbon steel
							pans.
						</p>
						<p>
							<strong>How posting works:</strong> On official site boards, you
							are free to post completely anonymously. However, butt3r is also
							driven by user-created boards managed directly by the community.
							These custom boards set their own rules—some allow anonymous
							posting, others require you to be signed in, and certain exclusive
							boards are invite-only.
						</p>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="mt-6">
					<Button onClick={handleDismiss} className="w-full sm:w-auto">
						I understand, let's go
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
