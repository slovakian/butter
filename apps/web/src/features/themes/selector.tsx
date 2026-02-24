import { Edit2, Search, Star } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// Themes are strictly individual entities. No nested light/dark configurations.
export type Theme = {
	id: string;
	name: string;
	isSystem: boolean;
	author: string;
};

// Mock data to illustrate the split between favorited and popular themes
const FAVORITED_THEMES: Theme[] = [
	{
		id: "sys-1",
		name: "Butter Default Light",
		isSystem: true,
		author: "Butter",
	},
	{ id: "usr-1", name: "Neon Nights Dark", isSystem: false, author: "jason_p" },
];

const POPULAR_THEMES: Theme[] = [
	{
		id: "sys-2",
		name: "Butter Midnight Dark",
		isSystem: true,
		author: "Butter",
	},
	{
		id: "usr-2",
		name: "Minimalist Paper Light",
		isSystem: false,
		author: "ui_guy",
	},
	{ id: "usr-3", name: "Hacker Terminal", isSystem: false, author: "dev_guru" },
];

export function ThemeSelector({
	onEdit,
}: {
	onEdit?: (themeId: string) => void;
}) {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredFavorites = useMemo(
		() =>
			FAVORITED_THEMES.filter((theme) =>
				theme.name.toLowerCase().includes(searchQuery.toLowerCase()),
			),
		[searchQuery],
	);

	const filteredPopular = useMemo(
		() =>
			POPULAR_THEMES.filter((theme) =>
				theme.name.toLowerCase().includes(searchQuery.toLowerCase()),
			),
		[searchQuery],
	);

	return (
		<div className="flex w-full flex-col gap-6 bg-background text-foreground">
			{/* Search Bar */}
			<div className="relative">
				<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search themes..."
					className="w-full border-border bg-background pl-9"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			<div className="space-y-6">
				{/* Favorited Themes Section */}
				{filteredFavorites.length > 0 && (
					<div className="space-y-3">
						<h3 className="flex items-center gap-2 px-1 font-medium text-foreground text-sm">
							<Star className="h-4 w-4 fill-primary text-primary" />
							Favorited Themes
						</h3>
						<div className="overflow-hidden rounded-md border border-border">
							<ThemeTable themes={filteredFavorites} />
						</div>
					</div>
				)}

				{/* Popular on Butter Section */}
				{filteredPopular.length > 0 && (
					<div className="space-y-3">
						<h3 className="px-1 font-medium text-muted-foreground text-sm">
							Popular on Butter
						</h3>
						<div className="overflow-hidden rounded-md border border-border">
							<ThemeTable themes={filteredPopular} />
						</div>
					</div>
				)}

				{/* Empty State */}
				{filteredFavorites.length === 0 && filteredPopular.length === 0 && (
					<div className="rounded-md border border-border border-dashed py-8 text-center text-muted-foreground text-sm">
						No themes found matching "{searchQuery}"
					</div>
				)}
			</div>
		</div>
	);
}

// Reusable table sub-component to keep the main component clean
function ThemeTable({ themes }: { themes: Theme[] }) {
	return (
		<Table>
			<TableHeader className="bg-muted/50">
				<TableRow className="border-border">
					<TableHead className="w-[45%]">Theme Name</TableHead>
					<TableHead className="w-[20%]">Author</TableHead>
					<TableHead className="w-[20%] text-right">Type</TableHead>
					<TableHead className="w-[15%] text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{themes.map((theme) => (
					<TableRow key={theme.id} className="border-border">
						<TableCell className="font-medium">{theme.name}</TableCell>
						<TableCell className="text-muted-foreground">
							{theme.author}
						</TableCell>
						<TableCell className="text-right">
							{theme.isSystem ? (
								<Badge variant="secondary">System</Badge>
							) : (
								<span className="text-muted-foreground text-xs">User</span>
							)}
						</TableCell>
						<TableCell className="text-right">
							{!theme.isSystem && (
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 text-muted-foreground hover:text-foreground"
									onClick={(e) => {
										e.stopPropagation(); // Don't trigger a row selection
										onEdit?.(theme.id);
									}}
								>
									<Edit2 className="h-4 w-4" />
									<span className="sr-only">Edit theme</span>
								</Button>
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
