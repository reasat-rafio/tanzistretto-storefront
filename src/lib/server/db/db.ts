import { DATABASE_URL } from '$env/static/private';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const client = new pg.Client({
  connectionString: DATABASE_URL,
});

await client.connect();

export const db = drizzle(client, { schema });
