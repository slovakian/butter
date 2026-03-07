import { env } from "@butter/env/server";
import type { Pool } from "@neondatabase/serverless";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "../prisma/generated/client";
import "./types";

export * from "../prisma/generated/client";

export const createDb = (): { db: PrismaClient; pool: Pool } => {
	const connectionString = env.DATABASE_URL;
	const adapter = new PrismaNeonHttp(connectionString, {});
	const db = new PrismaClient({ adapter });

	// Mock pool to satisfy return type and allow cleanup
	const pool = {
		end: () => db.$disconnect(),
	} as unknown as Pool;

	return { db, pool };
};

export type DbInstance = ReturnType<typeof createDb>;
export type DbClient = PrismaClient;

const adapter = new PrismaNeonHttp(env.DATABASE_URL, {});
export const tempDb = new PrismaClient({ adapter });
