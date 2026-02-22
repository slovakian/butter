import { createFileRoute } from "@tanstack/react-router";
import {
	Calculator,
	Calendar,
	CreditCard,
	Settings,
	Smile,
	User,
} from "lucide-react";
import * as React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"; // Added Checkbox
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress"; // Added Progress
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Added RadioGroup
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/design")({
	component: RouteComponent,
});

function RouteComponent() {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<div
			style={{
				display: "flex",
				height: "100vh",
				overflow: "hidden",
				fontFamily: "sans-serif",
			}}
		>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<Calendar className="mr-2 h-4 w-4" />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem>
							<Smile className="mr-2 h-4 w-4" />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem>
							<Calculator className="mr-2 h-4 w-4" />
							<span>Calculator</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<CreditCard className="mr-2 h-4 w-4" />
							<span>Billing</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
			{/* LEFT SIDEBAR: Navigation & Channels */}
			<nav
				style={{
					width: "280px",
					padding: "1rem",
					borderRight: "2px solid #e2e8f0",
					overflowY: "auto",
					backgroundColor: "#f8fafc",
				}}
			>
				<h1 style={{ margin: "0 0 1rem 0" }}>MyChat</h1>
				<Separator className="mb-4" /> {/* Shadcn Separator */}
				{/* SHADCN COMMAND */}
				<div style={{ marginBottom: "1rem" }}>
					<Button
						variant="outline"
						className="relative h-9 w-full justify-start text-muted-foreground text-sm sm:pr-12 md:w-40 lg:w-full"
						onClick={() => setOpen(true)}
					>
						<span className="hidden lg:inline-flex">Search...</span>
						<span className="inline-flex lg:hidden">Search...</span>
						<kbd className="pointer-events-none absolute top-1.5 right-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] opacity-100 sm:flex">
							<span className="text-xs">⌘</span>K
						</kbd>
					</Button>
				</div>
				{/* NATIVE HTML DETAILS */}
				<div style={{ marginBottom: "1rem" }}>
					<h3
						style={{
							fontSize: "0.875rem",
							textTransform: "uppercase",
							color: "gray",
						}}
					>
						Native HTML
					</h3>
					<details open>
						<summary>
							<strong>Text Channels</strong>
						</summary>
						<ul>
							<li>
								<a href="#general"># general</a>
							</li>
							<li>
								<a href="#help"># help</a>
							</li>
						</ul>
					</details>
				</div>
				{/* SHADCN ACCORDION */}
				<div style={{ marginBottom: "2rem" }}>
					<h3
						style={{
							fontSize: "0.875rem",
							textTransform: "uppercase",
							color: "gray",
						}}
					>
						Shadcn Primitives
					</h3>
					<Accordion defaultValue={["item-1"]}>
						<AccordionItem value="item-1">
							<AccordionTrigger>Voice Channels</AccordionTrigger>
							<AccordionContent>
								<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
									<li style={{ padding: "0.25rem 0" }}>🔊 Lounge</li>
									<li style={{ padding: "0.25rem 0" }}>🔊 Meeting Room</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
				{/* SHADCN ALERT DIALOG */}
				<div style={{ marginBottom: "2rem" }}>
					<h3
						style={{
							fontSize: "0.875rem",
							textTransform: "uppercase",
							color: "gray",
							marginBottom: "0.5rem",
						}}
					>
						Danger Zone
					</h3>
					<AlertDialog>
						<AlertDialogTrigger
							render={<Button variant="destructive" className="w-full" />}
						>
							Delete Channel
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete
									your channel and remove your data from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction>Continue</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
				{/* SETTINGS: Native vs Shadcn */}
				<div>
					<h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Settings</h3>

					<fieldset style={{ marginBottom: "1rem" }}>
						<legend>Native Preferences</legend>
						<div>
							<input type="checkbox" id="notifs" defaultChecked />
							<label htmlFor="notifs"> Enable Notifications</label>
						</div>
					</fieldset>

					<div
						style={{
							padding: "0.5rem",
							border: "1px solid #e2e8f0",
							borderRadius: "8px",
						}}
					>
						<h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem" }}>
							Shadcn Preferences
						</h4>

						{/* SHADCN CHECKBOX ADDED HERE */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.5rem",
								marginBottom: "0.75rem",
							}}
						>
							<Checkbox id="push-notifs" defaultChecked />
							<Label
								htmlFor="push-notifs"
								style={{ flex: 1, cursor: "pointer" }}
							>
								Push Notifications
							</Label>
						</div>

						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginBottom: "0.5rem",
							}}
						>
							<Label htmlFor="airplane-mode" style={{ flex: 1 }}>
								Airplane Mode
							</Label>
							<Switch id="airplane-mode" />
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<Label htmlFor="dm-mode" style={{ flex: 1 }}>
								Direct Messages
							</Label>
							<Switch id="dm-mode" defaultChecked />
						</div>
					</div>
				</div>
			</nav>

			{/* MAIN CONTENT: Chat Area */}
			<main
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					padding: "1rem",
				}}
			>
				{/* Header Area */}
				<header
					style={{
						borderBottom: "1px solid #e2e8f0",
						paddingBottom: "0.5rem",
						marginBottom: "1rem",
					}}
				>
					<h2 style={{ margin: 0 }}># general</h2>
					<p style={{ margin: "0.25rem 0 0 0", color: "gray" }}>
						<em>Topic: Testing default HTML browser styles vs. Shadcn UI.</em>
					</p>
				</header>

				{/* Chat History Area */}
				<section style={{ flex: 1, overflowY: "auto", paddingRight: "1rem" }}>
					{/* Native HTML Message */}
					<article style={{ marginBottom: "1.5rem" }}>
						<strong>System</strong>{" "}
						<small>
							<time>10:00 AM</time>
						</small>
						<p>
							Welcome to the server. Please read the{" "}
							<abbr title="Terms of Service">TOS</abbr>.
						</p>
						<progress value="100" max="100">
							100%
						</progress>
					</article>

					<article style={{ marginBottom: "1.5rem" }}>
						<strong>DevBot</strong>{" "}
						<small>
							<time>10:12 AM</time>
						</small>
						<p>
							Don't forget to test your code blocks. Press <kbd>Ctrl</kbd> +{" "}
							<kbd>C</kbd> to copy.
						</p>
						<pre
							style={{
								background: "#f1f5f9",
								padding: "1rem",
								borderRadius: "8px",
							}}
						>
							<code>
								{`function helloWorld() {
  console.log("Native HTML tags");
}`}
							</code>
						</pre>
					</article>

					{/* Shadcn UI Messages */}
					<Separator className="my-6" />

					<article
						style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem" }}
					>
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>SB</AvatarFallback>
						</Avatar>
						<div style={{ flex: 1 }}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "0.5rem",
									marginBottom: "0.25rem",
								}}
							>
								<strong>ShadcnBot</strong>
								<Badge variant="default">Bot</Badge>
								<small style={{ color: "gray" }}>
									<time>10:25 AM</time>
								</small>
							</div>
							<p style={{ margin: 0 }}>
								Hello! I am here to demonstrate how much cleaner things look
								with some styled primitives. Check out this interactive card
								component!
							</p>

							<div style={{ marginTop: "1rem", maxWidth: "450px" }}>
								<Card>
									<CardHeader>
										<CardTitle>System Alert</CardTitle>
										<CardDescription>
											Your environment is looking beautiful.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="mb-4 text-muted-foreground text-sm">
											This is a standard Shadcn Card. It groups content
											elegantly and provides subtle borders and shadows.
										</p>

										{/* SHADCN PROGRESS BAR ADDED HERE */}
										<div className="space-y-2">
											<div className="flex items-center justify-between font-medium text-xs">
												<span>Updating UI packages...</span>
												<span className="text-muted-foreground">78%</span>
											</div>
											<Progress value={78} className="w-full" />
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</article>
				</section>

				{/* FOOTER: Message Input Area */}
				<footer
					style={{
						marginTop: "1rem",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					{/* Native Form */}
					<form
						onSubmit={(e) => e.preventDefault()}
						style={{
							border: "1px dashed #cbd5e1",
							padding: "1rem",
							borderRadius: "8px",
						}}
					>
						<fieldset
							style={{
								display: "flex",
								gap: "0.5rem",
								border: "none",
								padding: 0,
								margin: 0,
							}}
						>
							<legend
								style={{
									fontSize: "0.8rem",
									color: "gray",
									marginBottom: "0.5rem",
								}}
							>
								Native Form Controls
							</legend>
							<textarea
								placeholder="Message #general..."
								rows={2}
								style={{ flex: 1 }}
							/>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "0.25rem",
								}}
							>
								<select defaultValue="normal">
									<option value="normal">Normal</option>
									<option value="important">Important!</option>
								</select>
								<button type="submit">Send</button>
							</div>
						</fieldset>
						<div
							style={{
								marginTop: "0.5rem",
								display: "flex",
								gap: "1rem",
								fontSize: "0.875rem",
							}}
						>
							<label>
								Color: <input type="color" defaultValue="#ff0000" />
							</label>
							<label>
								Volume: <input type="range" min="0" max="100" />
							</label>
						</div>
					</form>

					{/* Shadcn Form */}
					<form
						onSubmit={(e) => e.preventDefault()}
						style={{
							background: "#f8fafc",
							padding: "1rem",
							borderRadius: "8px",
							border: "1px solid #e2e8f0",
						}}
					>
						<Label
							style={{
								display: "block",
								marginBottom: "0.5rem",
								color: "gray",
								fontSize: "0.8rem",
							}}
						>
							Shadcn Form Controls
						</Label>
						<div
							style={{
								display: "flex",
								gap: "0.5rem",
								alignItems: "flex-start",
							}}
						>
							<Textarea
								placeholder="Type your message here using Shadcn..."
								className="resize-none"
							/>
							<div className="flex shrink-0 flex-col gap-3">
								<Button type="submit">Send Message</Button>

								{/* SHADCN RADIO GROUP ADDED HERE */}
								<RadioGroup
									defaultValue="normal"
									className="mt-1 flex flex-col gap-2"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="normal" id="r1" />
										<Label htmlFor="r1" className="text-xs">
											Normal
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="important" id="r2" />
										<Label htmlFor="r2" className="text-red-600 text-xs">
											Important!
										</Label>
									</div>
								</RadioGroup>
							</div>
						</div>

						<div
							style={{
								marginTop: "1rem",
								display: "flex",
								alignItems: "center",
								gap: "1rem",
							}}
						>
							<div style={{ width: "200px" }}>
								<Label
									htmlFor="volume-slider"
									style={{ marginBottom: "0.5rem", display: "block" }}
								>
									Master Volume (Slider)
								</Label>
								<Slider
									id="volume-slider"
									defaultValue={[50]}
									max={100}
									step={1}
								/>
							</div>
							<div style={{ flex: 1 }}>
								<Label
									htmlFor="file-upload"
									style={{ marginBottom: "0.5rem", display: "block" }}
								>
									Attach File (Input)
								</Label>
								<Input id="file-upload" type="file" />
							</div>
						</div>
					</form>
				</footer>
			</main>

			{/* RIGHT SIDEBAR: Member List */}
			<aside
				style={{
					width: "240px",
					padding: "1rem",
					borderLeft: "2px solid #e2e8f0",
					overflowY: "auto",
					backgroundColor: "#f8fafc",
				}}
			>
				<h3 style={{ marginBottom: "1rem" }}>Members (4)</h3>

				<div style={{ marginBottom: "1.5rem" }}>
					<h4
						style={{
							fontSize: "0.875rem",
							color: "gray",
							marginBottom: "0.5rem",
						}}
					>
						Admins — 1
					</h4>
					<div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
						<Avatar className="h-8 w-8">
							<AvatarFallback>A</AvatarFallback>
						</Avatar>
						<span>Admin</span>
						<Badge variant="destructive" style={{ marginLeft: "auto" }}>
							Owner
						</Badge>
					</div>
				</div>

				<div style={{ marginBottom: "1.5rem" }}>
					<h4
						style={{
							fontSize: "0.875rem",
							color: "gray",
							marginBottom: "0.5rem",
						}}
					>
						Online — 2
					</h4>
					<div
						style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
					>
						{/* ======================= */}
						{/* SHADCN CONTEXT MENU     */}
						{/* ======================= */}
						<ContextMenu>
							<ContextMenuTrigger>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: "0.5rem",
										cursor: "context-menu",
										padding: "0.25rem",
										borderRadius: "6px",
									}}
									className="transition-colors hover:bg-slate-200"
								>
									<Avatar className="h-8 w-8">
										<AvatarFallback>UA</AvatarFallback>
									</Avatar>
									<span>User_A (Right Click Me)</span>
								</div>
							</ContextMenuTrigger>
							<ContextMenuContent className="w-48">
								<ContextMenuItem>
									Profile
									<ContextMenuShortcut>⇧⌘P</ContextMenuShortcut>
								</ContextMenuItem>
								<ContextMenuItem>Message</ContextMenuItem>
								<ContextMenuItem>Add Friend</ContextMenuItem>
								<ContextMenuSeparator />
								<ContextMenuItem className="text-red-600 focus:bg-red-100 focus:text-red-600">
									Mute User_A
								</ContextMenuItem>
							</ContextMenuContent>
						</ContextMenu>

						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.5rem",
								padding: "0.25rem",
							}}
						>
							<Avatar className="h-8 w-8">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>SB</AvatarFallback>
							</Avatar>
							<span>ShadcnBot</span>
							<Badge variant="outline" style={{ marginLeft: "auto" }}>
								Bot
							</Badge>
						</div>
					</div>
				</div>

				<div>
					<h4
						style={{
							fontSize: "0.875rem",
							color: "gray",
							marginBottom: "0.5rem",
						}}
					>
						Offline — 1
					</h4>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "0.5rem",
							opacity: 0.5,
							padding: "0.25rem",
						}}
					>
						<Avatar className="h-8 w-8">
							<AvatarFallback>L9</AvatarFallback>
						</Avatar>
						<span>Lurker99</span>
					</div>
				</div>
			</aside>
		</div>
	);
}
