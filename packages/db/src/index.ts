import { env } from "@butter/env/server";
import { Pool } from "@neondatabase/serverless";
import { ZenStackClient } from "@zenstackhq/orm";
import { PostgresDialect } from "@zenstackhq/orm/dialects/postgres";
import { schema } from "../zenstack/generated/schema";

export const createDb = () => {
	const pool = new Pool({
		connectionString: env.DATABASE_URL,
	});

	const db = new ZenStackClient(schema, {
		dialect: new PostgresDialect({
			pool,
		}),
	});

	return { db, pool };
};

export type DbInstance = ReturnType<typeof createDb>;
export type DbClient = DbInstance["db"];

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

export const tempDb = new ZenStackClient(schema, {
	dialect: new PostgresDialect({
		pool,
	}),
});
