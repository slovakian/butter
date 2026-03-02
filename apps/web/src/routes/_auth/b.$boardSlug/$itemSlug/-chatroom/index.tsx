import { env } from "@butter/env/web";
import { useQuery } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import { usePartySocket } from "partysocket/react";
import { useEffect, useRef, useState } from "react";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
// import {
// 	Tooltip,
// 	TooltipContent,
// 	TooltipTrigger,
// } from "@/components/ui/tooltip";
import { api } from "@/utils/orpc";
import { SidebarNav } from "../../-components/sidebar-nav";

type ChatroomProps = {
	boardSlug: string;
	itemSlug: string;
};

// 30 seconds in milliseconds
const TIME_WINDOW = 30_1000;

type Message = {
	sender: string;
	content: string;
	timestamp: number;
	page_number: number;
};

export function Chatroom({ boardSlug, itemSlug }: ChatroomProps) {
	const { data: chatroom } = useQuery(
		api.board.chatroom.getBySlug.queryOptions({
			input: {
				boardSlug,
				chatroomSlug: itemSlug,
			},
			staleTime: Number.POSITIVE_INFINITY,
		}),
	);

	const { data: board } = useQuery(
		api.board.getBySlug.queryOptions({
			input: { slug: boardSlug },
			staleTime: Number.POSITIVE_INFINITY,
		}),
	);

	const [messages, setMessages] = useState<Message[]>([]);
	const [inputValue, setInputValue] = useState("");

	// Pagination State
	const [viewingPage, setViewingPage] = useState<number>(1);
	const [latestPage, setLatestPage] = useState<number>(1);

	// Keep ref in sync for event handlers
	const viewingPageRef = useRef(viewingPage);
	useEffect(() => {
		viewingPageRef.current = viewingPage;
	}, [viewingPage]);

	const socket = usePartySocket({
		party: "chatroom",
		room: `${boardSlug}-${itemSlug}`,
		host: env.VITE_SERVER_URL,
		prefix: "api/party",
		onMessage(event) {
			const data = JSON.parse(event.data);

			if (data.type === "init") {
				setLatestPage(data.latestPage);
				setViewingPage(data.viewingPage);
				setMessages(data.data);
			} else if (data.type === "page_data") {
				setViewingPage(data.page);
				setMessages(data.data);
			} else if (data.type === "new_message") {
				setLatestPage(data.latestPage);

				const currentViewing = viewingPageRef.current;

				// If the user is viewing the page this message belongs to, append it
				if (currentViewing === data.messagePage) {
					setMessages((prev) => [...prev, data.data]);
				}
				// AUTO-FLIP: If user was on the previous edge, and a new page started, auto-flip them forward
				else if (
					currentViewing === data.messagePage - 1 &&
					data.latestPage === data.messagePage
				) {
					// FIX: Optimistically update viewingPage immediately.
					// This keeps it in sync with latestPage and prevents the input from disabling!
					setViewingPage(data.messagePage);

					// Request the new page instantly
					socket.send(
						JSON.stringify({ type: "fetch_page", page: data.messagePage }),
					);
				}
			} else if (data.type === "error") {
				console.error("PartySocket server error:", data.error);
			}
		},
	});

	const sendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputValue.trim()) return;
		socket.send(
			JSON.stringify({
				type: "send_message",
				data: {
					content: inputValue,
					sender: "User", // Placeholder until auth is integrated
				},
			}),
		);
		setInputValue("");
	};

	const requestPage = (pageNumber: number) => {
		if (pageNumber < 1 || pageNumber > latestPage) return;
		socket.send(JSON.stringify({ type: "fetch_page", page: pageNumber }));
	};

	if (!chatroom) return <div>Loading...</div>;

	const reversedMessages = [...messages].reverse();

	return (
		<div className="flex h-full flex-col">
			{/* ITEM DETAILS BAR */}
			<div className="flex h-8 shrink-0 items-center justify-between border-border border-b bg-muted/50 px-3 text-foreground text-xs">
				<div className="flex items-center gap-2">
					<div className="md:hidden">
						<Drawer>
							<DrawerTrigger asChild>
								<button
									type="button"
									className="flex cursor-pointer items-center justify-center rounded-none p-1 hover:bg-accent hover:text-accent-foreground"
								>
									<Menu className="h-4 w-4" />
								</button>
							</DrawerTrigger>
							<Separator orientation="vertical" />
							<DrawerContent className="h-[75vh] font-mono">
								<DrawerHeader className="sr-only">
									<DrawerTitle>Navigation Menu</DrawerTitle>
								</DrawerHeader>
								<div className="flex h-full flex-col overflow-hidden text-foreground">
									<SidebarNav
										items={
											board?.items?.map((item) => ({
												id: String(item.id),
												name: item.name,
												slug: item.slug,
												type: item.type,
											})) || []
										}
									/>
								</div>
							</DrawerContent>
						</Drawer>
					</div>
					<div className="truncate font-bold">💬 {chatroom.name}</div>
				</div>

				{/* Channel Tools & Pagination */}
				<div className="flex shrink-0 items-center gap-4 overflow-x-auto">
					<div className="flex items-center gap-1 font-mono">
						<button
							type="button"
							onClick={() => requestPage(1)}
							disabled={viewingPage === 1}
							className="cursor-pointer px-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
						>
							&lt;&lt;
						</button>
						<button
							type="button"
							onClick={() => requestPage(viewingPage - 1)}
							disabled={viewingPage === 1}
							className="cursor-pointer px-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
						>
							&lt;
						</button>
						<span className="whitespace-nowrap px-2">
							Pg {viewingPage} / {latestPage}
						</span>
						<button
							type="button"
							onClick={() => requestPage(viewingPage + 1)}
							disabled={viewingPage === latestPage}
							className="cursor-pointer px-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
						>
							&gt;
						</button>
						<button
							type="button"
							onClick={() => requestPage(latestPage)}
							disabled={viewingPage === latestPage}
							className="cursor-pointer px-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
						>
							&gt;&gt;
						</button>
					</div>
					{/* ... (keep existing right side tools) ... */}
				</div>
			</div>

			{/* MESSAGE AREA */}
			<div className="flex flex-1 flex-col-reverse overflow-y-auto p-4">
				<div className="flex flex-col-reverse">
					{reversedMessages.length === 0 ? (
						<div className="py-4 text-center text-gray-500">
							No messages yet. Say hello!
						</div>
					) : (
						reversedMessages.map((msg, i) => {
							// Because the array is reversed (newest at index 0),
							// the message chronologically before this one is at index i + 1.
							const previousMsgInTime = reversedMessages[i + 1];

							// Check if we need to start a new visual group
							const isNewGroup =
								!previousMsgInTime || // It's the very first message ever
								previousMsgInTime.sender !== msg.sender || // Sender changed
								msg.timestamp - previousMsgInTime.timestamp > TIME_WINDOW; // Time gap is too large

							return (
								<div
									key={`${msg.timestamp}-${msg.sender}-${i}`}
									// Add top margin only if it's a new group to separate conversations
									className={`px-2 py-0.5 hover:bg-muted/20 ${isNewGroup ? "mt-3" : "mt-0"}`}
								>
									{isNewGroup && (
										<div className="mt-1 mb-1 flex items-baseline gap-2 text-muted-foreground text-xs">
											<span className="font-bold text-primary text-sm">
												{msg.sender}
											</span>
											<span suppressHydrationWarning>
												{new Date(msg.timestamp).toLocaleDateString()}
												{" ("}
												{new Date(msg.timestamp).toLocaleDateString("en-US", {
													weekday: "short",
												})}
												{") "}
												{new Date(msg.timestamp).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit",
												})}
											</span>
										</div>
									)}
									{/* The message content itself */}
									<div className="text-foreground text-sm leading-relaxed">
										{msg.content}
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>

			{/* CHAT INPUT AREA */}
			<div className="shrink-0 border-border border-t bg-muted/30 p-2">
				<form onSubmit={sendMessage} className="flex gap-2">
					<input
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder={`Message ${chatroom.name}...`}
						// Disable input if they are looking at history to enforce "only post on live edge"
						disabled={viewingPage !== latestPage}
						className="min-w-0 flex-1 border border-input bg-background px-2 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					/>
					<button
						type="submit"
						disabled={!inputValue.trim() || viewingPage !== latestPage}
						className="shrink-0 border border-border bg-secondary px-4 py-1 font-bold text-secondary-foreground text-sm hover:bg-secondary/80 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50"
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
}
