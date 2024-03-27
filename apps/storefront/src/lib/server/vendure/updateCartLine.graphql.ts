import type { Cookies } from '@sveltejs/kit';
import { gql } from '$lib/generated';
import { query } from '.';
import { parseAuthCookie } from './parseAuthCookie.graphql';

export const updateCartLine = async function (
  locals: App.Locals,
  cookies: Cookies,
  orderLineId: string,
  quantity: number,
) {
  const UpdateCartLine = gql(`
		mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {
			adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
				...ActiveOrder
				... on ErrorResult {
						errorCode
						message
				}
			}
		}
	`);
  const response = await query({
    document: UpdateCartLine,
    variables: { orderLineId, quantity },
    locals,
  });
  if (!response) return null;

  // Capture the credentials
  await parseAuthCookie(response.headers.getSetCookie(), locals, cookies);

  return await response
    .json()
    .then((body) => body?.data?.adjustOrderLine)
    .catch((e: Error) => {
      console.log(e);
      return null;
    });
};
