import { env } from "@butter/env/web";
import { createFileRoute } from "@tanstack/react-router";
import { Hash, Send, Server, Settings, Users } from "lucide-react";
import { usePartySocket } from "partysocket/react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/chat")({
	component: RouteComponent,
});

interface ChatMessage {
	id: string;
	message: string;
	sender: "me" | "them";
}

function RouteComponent() {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [connectionStatus, setConnectionStatus] = useState<
		"connecting" | "connected" | "disconnected"
	>("connecting");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const socket = usePartySocket({
		party: "channel",
		room: "general",
		host: env.VITE_SERVER_URL,
		prefix: "party",
		startClosed: false,
		onOpen() {
			setConnectionStatus("connected");
		},
		onClose() {
			setConnectionStatus("disconnected");
		},
		onMessage(event) {
			try {
				const data = JSON.parse(event.data);
				if (data.message) {
					setMessages((prev) => [
						...prev,
						{ id: crypto.randomUUID(), message: data.message, sender: "them" },
					]);
				}
			} catch (err) {
				console.error("Failed to parse message", err);
			}
		},
	});

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputValue.trim() || connectionStatus !== "connected") return;

		// Optimistic UI update
		setMessages((prev) => [
			...prev,
			{ id: crypto.randomUUID(), message: inputValue, sender: "me" },
		]);

		socket.send(JSON.stringify({ message: inputValue }));
		setInputValue("");
	};

	return (
		<div className="flex h-screen w-full overflow-hidden bg-background font-sans text-foreground">
			{/* 1. Server Sidebar (Far Left) */}
			<div className="flex w-[72px] flex-col items-center gap-3 border-border border-r bg-muted/50 py-3 sm:flex">
				<div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-[24px] bg-primary/10 text-primary shadow-sm transition-all hover:rounded-[16px]">
					<Server size={24} />
				</div>
				<div className="my-1 h-[2px] w-8 rounded-full bg-border" />
				<div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-[24px] bg-muted transition-all hover:rounded-[16px] hover:bg-primary/20 hover:text-primary">
					<span className="font-semibold text-lg">G</span>
				</div>
			</div>

			{/* 2. Channel Sidebar (Inner Left) */}
			<div className="flex w-60 flex-col border-border border-r bg-muted/20 md:flex">
				<header className="flex h-12 shrink-0 cursor-pointer items-center border-border border-b px-4 font-semibold shadow-sm transition-colors hover:bg-muted/50">
					General Server
				</header>
				<div className="flex-1 space-y-1 overflow-y-auto p-3">
					<button
						type="button"
						className="flex w-full items-center gap-2 rounded-md bg-muted/50 px-2 py-1.5 font-medium text-foreground text-sm"
					>
						<Hash size={18} className="text-muted-foreground" />
						general
					</button>
					<button
						type="button"
						className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 font-medium text-muted-foreground text-sm transition-colors hover:bg-muted/30 hover:text-foreground"
					>
						<Hash size={18} />
						random
					</button>
				</div>
				{/* User Profile Area */}
				<div className="flex h-14 shrink-0 items-center justify-between border-border border-t bg-muted/30 px-3">
					<div className="flex items-center gap-2 overflow-hidden">
						<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
							<Users size={16} />
						</div>
						<div className="flex flex-col truncate">
							<span className="truncate font-semibold text-foreground text-xs">
								Guest_User
							</span>
							<span className="truncate text-[10px] text-muted-foreground">
								{connectionStatus === "connected"
									? "🟢 Online"
									: connectionStatus === "connecting"
										? "🟡 Connecting..."
										: "🔴 Offline"}
							</span>
						</div>
					</div>
					<Settings
						size={18}
						className="shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
					/>
				</div>
			</div>

			{/* 3. Main Chat Area */}
			<div className="flex min-w-0 flex-1 flex-col bg-background">
				{/* Chat Header */}
				<header className="flex h-12 shrink-0 items-center gap-2 border-border border-b px-4 shadow-sm">
					<Hash size={20} className="text-muted-foreground" />
					<h2 className="font-semibold text-base">general</h2>
					<div className="mx-2 h-4 w-px bg-border" />
					<p className="truncate text-muted-foreground text-xs">
						The main chat room for everyone.
					</p>
				</header>

				{/* Message History */}
				<main className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
					{messages.length === 0 ? (
						<div className="flex flex-1 flex-col justify-end pb-4 text-muted-foreground">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
								<Hash size={24} />
							</div>
							<h1 className="mb-2 font-bold text-3xl text-foreground">
								Welcome to #general!
							</h1>
							<p className="text-sm">
								This is the start of the #general channel.
							</p>
						</div>
					) : (
						messages.map((msg) => (
							<div
								key={msg.id}
								className={`group -mx-1 flex gap-3 rounded-sm p-1 hover:bg-muted/10 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}
							>
								<div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
									<span className="font-bold text-primary text-sm">
										{msg.sender === "me" ? "ME" : "TH"}
									</span>
								</div>
								<div
									className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
								>
									<div className="flex items-baseline gap-2">
										<span className="font-medium text-foreground text-sm">
											{msg.sender === "me" ? "You" : "Them"}
										</span>
										<span className="text-muted-foreground text-xs group-hover:visible">
											{new Date().toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</span>
									</div>
									<p
										className={`wrap-break-word mt-1 max-w-2xl text-foreground/90 text-sm ${msg.sender === "me" ? "text-right" : "text-left"}`}
									>
										{msg.message}
									</p>
								</div>
							</div>
						))
					)}
					<div ref={messagesEndRef} />
				</main>

				{/* Input Area */}
				<div className="shrink-0 p-4 pt-0">
					<form
						onSubmit={handleSendMessage}
						className="flex items-center gap-2 rounded-lg border border-transparent bg-muted/50 p-2 transition-colors focus-within:border-border focus-within:bg-muted/80"
					>
						<button
							type="button"
							className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
						>
							<Users size={20} />
						</button>
						<input
							type="text"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							placeholder={
								connectionStatus === "connected"
									? "Message #general"
									: "Connecting..."
							}
							disabled={connectionStatus !== "connected"}
							className="flex-1 border-none bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
						/>
						<button
							type="submit"
							disabled={!inputValue.trim() || connectionStatus !== "connected"}
							className="shrink-0 rounded-full p-2 text-primary transition-colors hover:bg-background hover:text-primary/80 disabled:opacity-50"
						>
							<Send size={18} />
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
