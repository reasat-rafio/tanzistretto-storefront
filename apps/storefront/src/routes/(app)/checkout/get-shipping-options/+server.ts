import { getOrderShippingMethods } from '$lib/server/vendure/getOrderShippingMethods.graphql';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
  const options = await getOrderShippingMethods(locals);
  if (options) {
    return json(options);
  } else {
    throw error(500, 'server error');
  }
};
