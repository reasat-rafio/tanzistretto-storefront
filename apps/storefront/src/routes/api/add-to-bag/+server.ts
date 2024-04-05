import { addCartLine } from '$lib/server/vendure/addCartLine.graphql';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals, cookies }) => {
  const { variantId, size } = await request.json();

  if (!variantId) return error(400, 'bad format');
  const cart = await addCartLine(locals, cookies, variantId, 1);
  if (cart) return json({ success: true, cart });
  error(500, 'The service is unavailable.');
};
