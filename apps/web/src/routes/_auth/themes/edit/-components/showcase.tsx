import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
// Assuming standard shadcn/ui import paths
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Showcase(props: React.ComponentProps<"div">) {
	return (
		<div
			{...props}
			className={`mx-auto w-full max-w-6xl bg-background text-foreground ${props.className || ""}`}
		>
			<div className="p-5">
				<Card>
					<CardHeader>
						<CardTitle>Create Account</CardTitle>
						<CardDescription>
							Standard input fields and buttons.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="m@example.com" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" />
						</div>
						<div className="mt-4 flex items-center space-x-2">
							<Checkbox id="terms" />
							<Label htmlFor="terms" className="font-normal text-sm">
								Accept terms and conditions
							</Label>
						</div>
					</CardContent>
					<CardFooter>
						<Button className="w-full">Sign Up</Button>
					</CardFooter>
				</Card>
			</div>
			<Separator />
			{/* 2. Interactive Controls Card */}
			<div className="p-5">
				<Card>
					<CardHeader>
						<CardTitle>Settings</CardTitle>
						<CardDescription>Interactive toggles and sliders.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label className="text-base">Marketing emails</Label>
								<p className="text-muted-foreground text-sm">
									Receive updates and offers.
								</p>
							</div>
							<Switch defaultChecked />
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label className="text-base">Dark Mode</Label>
								<p className="text-muted-foreground text-sm">
									Toggle application theme.
								</p>
							</div>
							<Switch />
						</div>
						<div className="space-y-3 pt-4">
							<div className="flex justify-between">
								<Label>Volume</Label>
								<span className="text-muted-foreground text-sm">75%</span>
							</div>
							<Slider defaultValue={[75]} max={100} step={1} />
						</div>
					</CardContent>
				</Card>
			</div>
			<Separator />
			{/* 3. Avatars, Badges & Tabs */}
			<div className="p-5">
				<Card>
					<CardHeader>
						<CardTitle>Profile Overview</CardTitle>
						<CardDescription>Data display and navigation.</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="profile" className="w-full">
							<TabsList className="mb-4 grid w-full grid-cols-2">
								<TabsTrigger value="profile">Profile</TabsTrigger>
								<TabsTrigger value="status">Status</TabsTrigger>
							</TabsList>
							<TabsContent value="profile" className="space-y-4">
								<div className="flex items-center space-x-4">
									<Avatar className="h-12 w-12">
										<AvatarImage
											src="https://github.com/shadcn.png"
											alt="@shadcn"
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-medium text-sm leading-none">shadcn</p>
										<p className="text-muted-foreground text-sm">
											Lead Developer
										</p>
									</div>
								</div>
							</TabsContent>
							<TabsContent value="status" className="space-y-4">
								<div className="flex flex-wrap gap-2">
									<Badge variant="default">Online</Badge>
									<Badge variant="secondary">In Meeting</Badge>
									<Badge variant="destructive">Do Not Disturb</Badge>
									<Badge variant="outline">Away</Badge>
								</div>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
			<Separator />
			{/* 4. Button Variants Showcase (Spans across bottom or acts as 4th item) */}

			<div className="p-5">
				<Card className="md:col-span-2 lg:col-span-3">
					<CardHeader>
						<CardTitle>Button Variants</CardTitle>
						<CardDescription>
							A look at the different button states available.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-wrap gap-4">
						<Button variant="default">Default</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="destructive">Destructive</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="link">Link</Button>
					</CardContent>
				</Card>
			</div>
			{/* Main Grid */}
		</div>
	);
}
