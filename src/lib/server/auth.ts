import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from './db/db';
import { session, user } from './db/schema';
import { Google, Facebook } from 'arctic';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

const redirectUrl = `${PUBLIC_BASE_URL}/auth/callback/google`;

export const google = new Google(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  redirectUrl,
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },

  getUserAttributes: (data) => {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      isAdmin: data.isAdmin,
      email: data.email,
      image: data.image,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      firstName: string;
      lastName: string;
      isAdmin: boolean;
      email: string;
      image?: string;
    };
  }
}
