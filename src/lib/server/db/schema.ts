import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  boolean,
  primaryKey,
} from 'drizzle-orm/pg-core';

export const providerEnum = pgEnum('provider', ['google', 'facebook']);
export const user = pgTable(
  'user',
  {
    id: text('id').unique().notNull(),
    provider: providerEnum('provider').notNull(),
    providerId: text('provider_id').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    isAdmin: boolean('is_admin').notNull().default(false),
    email: text('email').notNull().unique(),
    image: text('image'),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.provider, table.providerId] }),
    };
  },
);

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});
