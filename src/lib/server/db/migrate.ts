import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, client } from './db';

await migrate(db, { migrationsFolder: '/migrations' });
await client.end();
