import type { Cookies } from '@sveltejs/kit';
import { gql } from '$lib/generated';
import { query } from '.';
import { parseAuthCookie } from './parseAuthCookie.graphql';

export const verifyEmail = async function (
  locals: App.Locals,
  cookies: Cookies,
  token: string,
) {
  const VerifyEmail = gql(`
		mutation Verify($token: String!) {
			verifyCustomerAccount(token: $token) {
				...on CurrentUser {
					id
					identifier
				}
				...on ErrorResult {
					errorCode
					message
				}
			}
		}
	`);
  const response = await query({
    document: VerifyEmail,
    variables: { token },
    locals,
  });
  if (!response) return null;

  // Capture the credentials
  await parseAuthCookie(response.headers.getSetCookie(), locals, cookies);

  return await response
    .json()
    .then((body) => body?.data?.verifyCustomerAccount)
    .catch((e: Error) => {
      console.log(e);
      return null;
    });
};
