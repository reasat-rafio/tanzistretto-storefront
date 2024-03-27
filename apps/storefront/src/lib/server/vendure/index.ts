import { print, type ASTNode } from 'graphql';
import { SuperFetch } from 'sveltekit-superfetch';
import { dev } from '$app/environment';
import {
  VENDURE_SHOPAPI_DEV_URL,
  VENDURE_SHOPAPI_PROD_URL,
} from '$env/static/private';

interface QueryOptions {
  document: ASTNode;
  variables?: unknown;
  locals?: App.Locals;
  key?: string;
  ttl?: number;
  revalidate?: boolean;
  logLevel?: 'verbose' | 'limited' | 'silent';
}

export const superFetch = new SuperFetch({
  retry: 3,
  timeout: 5000,
  ttl: 1000,
  logLevel: 'silent',
});

export const query = async function (
  options: QueryOptions,
): Promise<Response | null> {
  const { locals, document, variables, ...rest } = options;
  const headers = new Headers({ 'Content-Type': 'application/json' });

  if (locals && locals.sid && locals.ssig) {
    headers.append(
      'Cookie',
      `session=${locals.sid}; session.sig=${locals.ssig}`,
    );
  }

  return await superFetch
    .query({
      url: dev ? VENDURE_SHOPAPI_DEV_URL : VENDURE_SHOPAPI_PROD_URL,
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: print(document),
        variables,
      }),
      ...rest,
    })
    .catch((e: Error) => {
      console.log(e);
      return null;
    });
};
