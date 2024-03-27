import { googleSignIn } from '$lib/server/vendure/googleSignIn.graphql';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals, cookies }) => {
  const googleUser = await request.json();

  if (!googleUser) {
    throw error(400, 'bad format');
  }

  const result = await googleSignIn(locals, cookies, googleUser);

  if (!result) {
    return json({
      message: 'The service is unavailable.',
      status: 424,
    });
  } else if (result && result.id) {
    return json({
      message: 'success',
      status: 200,
    });
  } else {
    return json({
      message:
        'A user with that email address was not found or the password was not valid.',
      status: 401,
    });
  }
};
