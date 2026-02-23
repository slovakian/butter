import { env } from "@butter/env/server";
import { Pool } from "@neondatabase/serverless";
import { ZenStackClient } from "@zenstackhq/orm";
import { PostgresDialect } from "@zenstackhq/orm/dialects/postgres";
import { schema } from "../zenstack/schema/schema";

export const db = new ZenStackClient(schema, {
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: env.DATABASE_URL,
		}),
	}),
});
