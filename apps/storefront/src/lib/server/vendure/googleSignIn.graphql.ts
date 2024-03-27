import { gql } from '$lib/generated';
import { query } from '.';
import { parseAuthCookie } from './parseAuthCookie.graphql';
import type { Cookies } from '@sveltejs/kit';

export const googleSignIn = async function (
  locals: App.Locals,
  cookies: Cookies,
  googleUser: any,
) {
  const SignIn = gql(`
		mutation Authenticate($token: String!) {
            authenticate(input: {
                google: { token: $token }
                }) {
                ...on CurrentUser {
                    id
                    identifier
                }
            }
		}
	`);

  const response = await query({
    document: SignIn,
    variables: { token: googleUser.getAuthResponse().id_token },
    locals,
  });

  if (!response) return null;

  // Capture the credentials
  await parseAuthCookie(response.headers.getSetCookie(), locals, cookies);

  return await response
    .json()
    .then((body) => body?.data?.login)
    .catch((e: Error) => {
      console.log(e);
      return null;
    });
};
