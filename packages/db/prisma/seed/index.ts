import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/client";
import { seedBoards } from "./data";

// Load environment variables from process.env (loaded by dotenv-cli)
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	console.error("DATABASE_URL is not set");
	process.exit(1);
}

const adapter = new PrismaNeonHttp(DATABASE_URL, {});
const db = new PrismaClient({ adapter });

async function main() {
	console.log("Seeding boards...");

	// Optional: Clean up existing seed boards to ensure fresh state with correct structure
	// This is useful for development/seeding when schema/structure changes
	console.log("Cleaning up existing seed boards...");
	await db.board.deleteMany({
		where: {
			slug: { in: seedBoards.map((b) => b.slug) },
		},
	});

	for (const board of seedBoards) {
		const existingBoard = await db.board.findUnique({
			where: { slug: board.slug },
		});

		if (!existingBoard) {
			const newBoard = await db.board.create({
				data: {
					...board,
				},
			});
			console.log(`Created board: ${board.name}`);

			await db.chatroom.create({
				data: {
					name: "general",
					slug: "general",
					boardId: newBoard.id,
				},
			});
			console.log(`Created general chatroom for: ${board.name}`);
		} else {
			console.log(`Board already exists: ${board.name}`);
		}
	}
	console.log("Seeding complete.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await db.$disconnect();
	});
