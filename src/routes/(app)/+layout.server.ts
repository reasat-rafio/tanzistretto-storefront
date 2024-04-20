import { error } from '@sveltejs/kit';
import { sanityClient } from '$lib/sanity/sanity-client';
import { siteQuery } from '$lib/sanity/query';
import type { SiteDataProps } from '$lib/types/site.types.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { customerDeliveryAddress } from '$lib/utils/validators.js';

export const load = async ({ locals: { user, session } }) => {
  const data: SiteDataProps = await sanityClient.fetch(siteQuery);
  if (!data) throw error(404, { message: 'Not found' });

  const addDeliveryAddressForm = await superValidate(
    zod(customerDeliveryAddress),
    { id: 'add-address' },
  );
  const updateDeliveryAddressForm = await superValidate(
    zod(customerDeliveryAddress),
    { id: 'edit-address' },
  );

  return {
    user: user,
    site: data,
    addDeliveryAddressForm,
    updateDeliveryAddressForm,
  };
};
