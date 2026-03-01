// apps/server/src/lib/chatroom.ts

import { type Connection, type ConnectionContext, Server } from "partyserver";

type Message = {
	id?: number;
	sender: string;
	content: string;
	timestamp: number;
	page_number: number;
};

const PAGE_SIZE = 7; // Explicit page size limit

export class Chatroom extends Server {
	currentPage = 1;
	messageCount = 0;

	onStart() {
		try {
			this.ctx.storage.sql.exec(`
                CREATE TABLE IF NOT EXISTS messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    sender TEXT,
                    content TEXT,
                    timestamp INTEGER,
                    page_number INTEGER
                );
            `);

			// Migration: Ensure page_number column exists for existing tables created before the schema change
			try {
				this.ctx.storage.sql.exec(
					"ALTER TABLE messages ADD COLUMN page_number INTEGER DEFAULT 1",
				);
			} catch (e) {
				// Column likely already exists or table structure is different
			}

			// Hydrate the current page state from local SQLite
			const result = this.ctx.storage.sql
				.exec(`
                SELECT page_number, COUNT(*) as count 
                FROM messages 
                GROUP BY page_number 
                ORDER BY page_number DESC 
                LIMIT 1
            `)
				.toArray()[0];

			if (result) {
				this.currentPage = result.page_number as number;
				this.messageCount = result.count as number;
			}
		} catch (e) {
			console.error("Chatroom onStart error:", e);
		}
	}

	async onConnect(connection: Connection, _ctx: ConnectionContext) {
		try {
			// Send the history of the *latest* page on connect
			const history = this.ctx.storage.sql
				.exec(
					"SELECT * FROM messages WHERE page_number = ? ORDER BY timestamp ASC",
					this.currentPage,
				)
				.toArray();

			connection.send(
				JSON.stringify({
					type: "init",
					latestPage: this.currentPage,
					viewingPage: this.currentPage,
					data: history,
				}),
			);
		} catch (e) {
			console.error("Chatroom onConnect error:", e);
			connection.send(JSON.stringify({ type: "error", error: String(e) }));
		}
	}

	async onMessage(connection: Connection, message: string) {
		try {
			const parsed = JSON.parse(message);

			// Handle client requesting an older page
			if (parsed.type === "fetch_page") {
				const requestedPage = parsed.page;
				const history = this.ctx.storage.sql
					.exec(
						"SELECT * FROM messages WHERE page_number = ? ORDER BY timestamp ASC",
						requestedPage,
					)
					.toArray();

				connection.send(
					JSON.stringify({
						type: "page_data",
						page: requestedPage,
						data: history,
					}),
				);
				return;
			}

			// Handle incoming new message
			if (parsed.type === "send_message") {
				// Check if page is full before inserting
				if (this.messageCount >= PAGE_SIZE) {
					this.currentPage++;
					this.messageCount = 0;
				}

				const timestamp = Date.now();
				const data = parsed.data;

				// Store message
				this.ctx.storage.sql.exec(
					"INSERT INTO messages (sender, content, timestamp, page_number) VALUES (?, ?, ?, ?)",
					data.sender || "Anonymous",
					data.content,
					timestamp,
					this.currentPage,
				);

				this.messageCount++;

				// Broadcast to all connections
				this.broadcast(
					JSON.stringify({
						type: "new_message",
						latestPage: this.currentPage,
						messagePage: this.currentPage,
						data: {
							sender: data.sender || "Anonymous",
							content: data.content,
							timestamp,
							page_number: this.currentPage,
						},
					}),
				);
			}
		} catch (e) {
			console.error("Error processing message:", e);
		}
	}
}
