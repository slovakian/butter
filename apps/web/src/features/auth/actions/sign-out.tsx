import { useQueryClient } from "@tanstack/react-query";
import type React from "react";
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
import { authClient } from "../client";
import { authQueryOptions, useAuth } from "../query";

// Derives the result type directly from BetterAuth's signOut method
type SignOutResult = Awaited<ReturnType<(typeof authClient)["signOut"]>>;

interface SignOutActionProps {
	onSignOut?: () => void;
	onSuccess?: (data: SignOutResult) => void;
	onError?: (error: unknown) => void;
	children: (props: {
		signOut: () => Promise<void>;
		prompt: () => void;
	}) => React.ReactNode;
}

export function SignOutAction({
	onSignOut,
	onSuccess,
	onError,
	children,
}: SignOutActionProps) {
	const [isOpen, setIsOpen] = useState(false);

	const queryClient = useQueryClient();
	const { data: session } = useAuth();

	const signOut = async () => {
		try {
			// Optional pre-signout callback
			onSignOut?.();

			// BetterAuth signout
			const result = await authClient.signOut();

			// Force a refetch of the auth query state before proceeding
			await queryClient.fetchQuery({
				queryKey: authQueryOptions.queryKey,
			});

			// Handle BetterAuth's specific object return signature { data, error }
			if (result?.error) {
				onError?.(result.error);
			} else {
				onSuccess?.(result);
			}

			setIsOpen(false);
		} catch (error) {
			onError?.(error);
		}
	};

	const prompt = () => setIsOpen(true);

	const isAnonymous = session?.user?.isAnonymous;

	return (
		<>
			{children({ signOut, prompt })}

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Sign Out</DialogTitle>
						<DialogDescription>
							Are you sure you want to sign out of your account?
						</DialogDescription>
					</DialogHeader>

					{isAnonymous && (
						<div className="mt-2 rounded-rounded bg-muted p-3 text-muted-foreground text-sm">
							<p>
								<strong>Warning:</strong> Signing out does NOT delete your
								anonymous account. If you want to delete the anonymous account,
								you'll need to sign in with merge.
							</p>
						</div>
					)}

					<DialogFooter className="mt-4">
						<Button variant="outline" onClick={() => setIsOpen(false)}>
							Cancel
						</Button>
						<Button variant="default" onClick={signOut}>
							Sign Out
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
