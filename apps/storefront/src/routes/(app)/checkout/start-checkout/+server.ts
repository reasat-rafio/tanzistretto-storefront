import { getCustomerAddresses } from '$lib/server/vendure/getCustomerAddresses.graphql';
import { getOrderPaymentMethods } from '$lib/server/vendure/getOrderPaymentMethods.graphql';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
  const promises = Promise.all([
    getCustomerAddresses(locals),
    getOrderPaymentMethods(locals),
  ]);
  const [addresses, paymentOptions] = await promises;
  const contacts = getContacts(addresses);
  return json({ contacts, paymentOptions });
};

function getContacts(addresses: any[] = []) {
  const contacts = [];
  for (const address of addresses) {
    contacts.push({
      name: address.fullName,
      address: {
        line1: address.streeLine1,
        line2: address.streetLine2,
        city: address.city,
        state: address.province,
        postal_code: address.postalCode,
        country: address.country.toUpperCase(),
      },
    });
  }
  return contacts;
}
