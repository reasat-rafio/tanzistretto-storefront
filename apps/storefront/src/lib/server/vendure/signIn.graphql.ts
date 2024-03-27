import type { Cookies } from '@sveltejs/kit';
import { gql } from '$lib/generated';
import { query } from '.';
import { parseAuthCookie } from './parseAuthCookie.graphql';

export const signIn = async function (
  locals: App.Locals,
  cookies: Cookies,
  emailAddress: string,
  password: string,
) {
  const SignIn = gql(`
		mutation LogIn($emailAddress: String!, $password: String!, $rememberMe: Boolean!) {
			login(username: $emailAddress, password: $password, rememberMe: $rememberMe) {
				... on  CurrentUser {
					id
					identifier
				}
				... on ErrorResult {
					errorCode
					message
				}
			}
		}
	`);

  const response = await query({
    document: SignIn,
    variables: { emailAddress, password, rememberMe: true },
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
