import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/header";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_auth/")({
	component: HomeComponent,
});

const TITLE_TEXT = `
 ▄▄▄▄    █    ██ ▄▄▄█████▓▄▄▄█████▓▓█████  ██▀███  
▓█████▄  ██  ▓██▒▓  ██▒ ▓▒▓  ██▒ ▓▒▓█   ▀ ▓██ ▒ ██▒
▒██▒ ▄██▓██  ▒██░▒ ▓██░ ▒░▒ ▓██░ ▒░▒███   ▓██ ░▄█ ▒
▒██░█▀  ▓▓█  ░██░░ ▓██▓ ░ ░ ▓██▓ ░ ▒▓█  ▄ ▒██▀▀█▄  
░▓█  ▀█▓▒▒█████▓   ▒██▒ ░   ▒██▒ ░ ░▒████▒░██▓ ▒██▒
░▒▓███▀▒░▒▓▒ ▒ ▒   ▒ ░░     ▒ ░░   ░░ ▒░ ░░ ▒▓ ░▒▓░
▒░▒   ░ ░░▒░ ░ ░     ░        ░     ░ ░  ░  ░▒ ░ ▒░
 ░    ░  ░░░ ░ ░   ░        ░         ░     ░░   ░ 
 ░         ░                          ░  ░   ░     
      ░
`.trim();

const topChannels = [
	{
		name: "💀 the main circus",
		active: 12,
		messages: 1250,
		lastMessage: "who up wonking they willy",
		space: "Engineering",
		lastActivity: "2m ago",
	},
	{
		name: "🤡 brain rot central 🧠",
		active: 5,
		messages: 3400,
		lastMessage: "skibidi toilet was actually a cinematic masterpiece",
		space: "Social",
		lastActivity: "10m ago",
	},
	{
		name: "⚛️ js is my personality",
		active: 8,
		messages: 890,
		lastMessage: "React 19 is just a vibes based framework now",
		space: "Engineering",
		lastActivity: "15m ago",
	},
	{
		name: "📢 federal agents",
		active: 0,
		messages: 50,
		lastMessage: "Stop @ing everyone or get banned",
		space: "All Hands",
		lastActivity: "1h ago",
	},
	{
		name: "💅 pixel pushers only",
		active: 3,
		messages: 420,
		lastMessage: "the border-radius is 1px off and i'm literally shaking",
		space: "Design",
		lastActivity: "2h ago",
	},
	{
		name: "📉 corporate sellouts",
		active: 2,
		messages: 150,
		lastMessage: "How do we monetize the memes?",
		space: "Marketing",
		lastActivity: "3h ago",
	},
	{
		name: "💎 wallstreetbets rejects 🚀",
		active: 1,
		messages: 80,
		lastMessage: "I lost the company's Q3 budget on 0DTE calls",
		space: "Finance",
		lastActivity: "4h ago",
	},
	{
		name: "🛠️ the engine room (do not enter)",
		active: 0,
		messages: 30,
		lastMessage: "if the server dies we all die",
		space: "Operations",
		lastActivity: "5h ago",
	},
	{
		name: "🧢 yap city 🗣️",
		active: 4,
		messages: 600,
		lastMessage: "Hear me out: what if we add AI to the toaster?",
		space: "Product",
		lastActivity: "6h ago",
	},
	{
		name: "🐛 spaghet code 🍝",
		active: 6,
		messages: 210,
		lastMessage: "it works on my machine idk what to tell u",
		space: "Engineering",
		lastActivity: "7h ago",
	},
];

const spaces = [
	{
		name: "Engineering",
		members: 45,
		messages: 12000,
		lastActivity: "Today",
		status: "Public",
	},
	{
		name: "Social",
		members: 60,
		messages: 5000,
		lastActivity: "Yesterday",
		status: "Public",
	},
	{
		name: "Design",
		members: 15,
		messages: 2000,
		lastActivity: "2 days ago",
		status: "Public",
	},
	{
		name: "Marketing",
		members: 10,
		messages: 1500,
		lastActivity: "3 days ago",
		status: "Private",
	},
	{
		name: "Finance",
		members: 8,
		messages: 500,
		lastActivity: "1 week ago",
		status: "Private",
	},
];

function HomeComponent() {
	return (
		<>
			<Header />
			<div className="container mx-auto max-w-4xl space-y-8 px-4 py-8">
				<pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>

				<section className="rounded-lg border p-6">
					<h2 className="mb-4 font-semibold text-xl">Top Channels</h2>
					<Table>
						<TableCaption>A list of the top active channels.</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[150px]">Name</TableHead>
								<TableHead className="text-right">Active</TableHead>
								<TableHead className="text-right">Messages</TableHead>
								<TableHead>Last Message</TableHead>
								<TableHead>Space</TableHead>
								<TableHead className="text-right">Last Activity</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{topChannels.map((channel) => (
								<TableRow key={channel.name}>
									{/* Removed the # prefix so the emoji is the first thing visible */}
									<TableCell className="whitespace-nowrap font-medium">
										{channel.name}
									</TableCell>
									<TableCell className="text-right">{channel.active}</TableCell>
									<TableCell className="text-right">
										{channel.messages.toLocaleString()}
									</TableCell>
									<TableCell
										className="max-w-[200px] truncate text-muted-foreground italic"
										title={channel.lastMessage}
									>
										"{channel.lastMessage}"
									</TableCell>
									<TableCell>{channel.space}</TableCell>
									<TableCell className="text-right">
										{channel.lastActivity}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</section>

				<section className="rounded-lg border p-6">
					<h2 className="mb-4 font-semibold text-xl">Spaces</h2>
					<Table>
						<TableCaption>Overview of all spaces.</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead className="text-right">Members</TableHead>
								<TableHead className="text-right">Messages</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Last Activity</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{spaces.map((space) => (
								<TableRow key={space.name}>
									<TableCell className="font-medium">{space.name}</TableCell>
									<TableCell className="text-right">{space.members}</TableCell>
									<TableCell className="text-right">
										{space.messages.toLocaleString()}
									</TableCell>
									<TableCell>
										<span
											className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${space.status === "Public" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
										>
											{space.status}
										</span>
									</TableCell>
									<TableCell className="text-right">
										{space.lastActivity}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</section>
			</div>
		</>
	);
}
