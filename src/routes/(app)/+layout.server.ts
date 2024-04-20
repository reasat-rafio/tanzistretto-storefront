import { error } from '@sveltejs/kit';
import { sanityClient } from '$lib/sanity/sanity-client';
import { siteQuery } from '$lib/sanity/query';
import type { SiteDataProps } from '$lib/types/site.types.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import {
  addCustomerDeliveryAddress,
  updateCustomerDeliveryAddress,
} from '$lib/utils/validators.js';
import { db } from '$lib/server/db/db.js';
import { address } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export const load = async ({ locals: { user, session } }) => {
  const data: SiteDataProps = await sanityClient.fetch(siteQuery);
  if (!data) throw error(404, { message: 'Not found' });

  let deliveryAddress: (typeof address.$inferSelect)[] | null = null;

  if (user) {
    deliveryAddress = await db.query.address.findMany({
      where: eq(address.userId, user.id),
    });
  }
  const addDeliveryAddressForm = await superValidate(
    zod(addCustomerDeliveryAddress),
    { id: 'add-address' },
  );
  const updateDeliveryAddressForm = await superValidate(
    zod(updateCustomerDeliveryAddress),
    { id: 'update-address' },
  );

  return {
    user: user,
    site: data,
    deliveryAddress,
    addDeliveryAddressForm,
    updateDeliveryAddressForm,
  };
};
