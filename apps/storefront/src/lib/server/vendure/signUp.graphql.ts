import type { Cookies } from '@sveltejs/kit';
import type { RegisterCustomerInput } from '$lib/generated/graphql';
import { gql } from '$lib/generated';
import { query } from '.';
import { parseAuthCookie } from './parseAuthCookie.graphql';

export const signUp = async function (
  locals: App.Locals,
  cookies: Cookies,
  input: RegisterCustomerInput,
) {
  const SignUp = gql(`
		mutation Register($input: RegisterCustomerInput!) {
			registerCustomerAccount(input: $input) {
				... on Success {
					success
				}
				...on ErrorResult {
					errorCode
					message
				}
			}
		}
	`);
  const response = await query({
    document: SignUp,
    variables: { input },
    locals,
  });
  if (!response) return null;

  // Capture the credentials
  await parseAuthCookie(response.headers.getSetCookie(), locals, cookies);

  return await response
    .json()
    .then((body) => body?.data?.registerCustomerAccount)
    .catch((e: Error) => {
      console.log(e);
      return null;
    });
};
