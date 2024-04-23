import { env } from '$env/dynamic/private';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const client = new pg.Client({
  connectionString:
    'postgres://postgres:65bcc4b6925e43fc@152.42.253.170:5050/postgres',
});

await client.connect();

export const db = drizzle(client, { schema });
