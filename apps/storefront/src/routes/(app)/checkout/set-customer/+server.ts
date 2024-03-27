import type { CreateCustomerInput } from '$lib/generated/graphql';
import { setOrderCustomer } from '$lib/server/vendure/setOrderCustomer.graphql';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  const customer: CreateCustomerInput = await request.json().catch((e) => {
    console.log(e);
    return null;
  });
  if (!customer) {
    throw error(400, 'bad format');
  }

  const result = await setOrderCustomer(locals, customer);
  if (result.errorCode === 'EMAIL_ADDRESS_CONFLICT_ERROR') {
    throw error(409, 'email address conflict');
  } else if (!result.errorCode) {
    return json({ success: true });
  } else {
    throw error(500, 'server error');
  }
};
