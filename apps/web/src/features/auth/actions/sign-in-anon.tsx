import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "../client";
import { authQueryOptions } from "../query";

interface SignInAnonActionProps {
	children: (props: { openDialog: () => void }) => React.ReactNode;
}

export function SignInAnonAction({ children }: SignInAnonActionProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const queryClient = useQueryClient();
	const session = authClient.useSession();

	const handleSignIn = async () => {
		setIsLoading(true);
		try {
			if (session.data?.user) {
				await authClient.signOut();
			}

			await authClient.signIn.anonymous({
				fetchOptions: {
					onSuccess: async () => {
						await queryClient.fetchQuery({
							queryKey: authQueryOptions.queryKey,
						});
						setIsOpen(false);
						toast.success("Entered as guest");
					},
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
				},
			});
		} catch (error) {
			// Better-auth client usually handles errors in onError, but we catch just in case
			console.error(error);
			toast.error("Failed to sign in anonymously");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{children({ openDialog: () => setIsOpen(true) })}
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>Guest Access Limitations</DialogTitle>
						<DialogDescription>
							You are about to enter as an anonymous guest. Please review what
							you can and cannot do.
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-4 py-2 text-sm">
						<div className="space-y-2">
							<h4 className="font-medium leading-none">Restricted Actions</h4>
							<ul className="list-disc space-y-1 pl-4 text-muted-foreground">
								<li>Cannot create, favorite, or rate custom themes.</li>
								<li>
									Cannot apply custom themes (you are limited to the native
									Light and Dark themes).
								</li>
								<li>Cannot set a custom username.</li>
								<li>Cannot access user settings.</li>
							</ul>
						</div>

						<div className="space-y-2">
							<h4 className="font-medium leading-none">Allowed Actions</h4>
							<ul className="list-disc space-y-1 pl-4 text-muted-foreground">
								<li>
									Join and interact in all official boards (note: some boards
									may be restricted to members only).
								</li>
								<li>Browse public content.</li>
							</ul>
						</div>
					</div>

					<DialogFooter className="gap-2 sm:gap-0">
						<Button
							variant="outline"
							onClick={() => setIsOpen(false)}
							disabled={isLoading}
						>
							Cancel
						</Button>
						<Button onClick={handleSignIn} disabled={isLoading}>
							{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}I
							Understand, Enter as Guest
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
