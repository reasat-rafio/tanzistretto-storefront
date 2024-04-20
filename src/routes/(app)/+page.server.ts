import { sanityClient } from '$lib/sanity/sanity-client';
import { asset } from '$lib/sanity/sanity-image';
import type { LandingPageProps } from '$lib/types/landing.types';
import groq from 'groq';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import {
  addCustomerDeliveryAddress,
  updateCustomerDeliveryAddress,
} from '$lib/utils/validators';
import { db } from '$lib/server/db/db';
import { address } from '$lib/server/db/schema';
import { generateId } from 'lucia';
import { eq } from 'drizzle-orm';

async function getSanityHomePageData(): Promise<LandingPageProps> {
  const sanityQuery = groq`
	*[_id == "landingPage"][0]{
		...,
		sections[] {
			...,
			${asset('image')},
		},
	}
`;

  return await sanityClient.fetch(sanityQuery).catch(() => null);
}

export const load: PageServerLoad = async () => {
  // const products = await medusa.getProducts({ limit: 1 });

  return {
    page: await getSanityHomePageData(),
    // products,
  };
};

export const actions: Actions = {
  addDeliveryAddress: async ({ request, locals }) => {
    const form = await superValidate(request, zod(addCustomerDeliveryAddress), {
      id: 'add-address',
    });

    if (!form.valid) {
      return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation
    }

    if (!locals.user) {
      return message(form, 'No user session exist', { status: 500 }); // this shouldn't happen because of client-side validation
    }

    try {
      const userHaveAddress = await db.query.address.findFirst({
        where: eq(address.userId, locals.user.id),
      });

      await db.insert(address).values({
        id: generateId(40),
        userId: locals.user.id,
        fullName: form.data.fullName,
        address1: form.data.address1,
        address2: form.data.address2,
        city: form.data.city,
        postalCode: form.data.postalCode,
        country: form.data.countryCode,
        phoneNumber: form.data.phoneNumber,
        isDefault: userHaveAddress ? false : true,
      });

      return message(form, 'Address added successfully');
    } catch (e) {
      return message(form, 'Something went wrong, please try again.', {
        status: 500,
      });
    }
  },

  updateDeliveryAddress: async ({ request, locals }) => {
    const form = await superValidate(
      request,
      zod(updateCustomerDeliveryAddress),
      {
        id: 'update-address',
      },
    );

    if (!form.valid) {
      return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation
    }

    if (!locals.user) {
      return message(form, 'No user session exist', { status: 500 }); // this shouldn't happen because of client-side validation
    }

    const addressExist = await db.query.address.findFirst({
      where: eq(address.id, form.data.addr_id),
    });
    if (!addressExist) {
      return message(form, 'Address not found', { status: 404 });
    }

    try {
      await db.update(address).set({
        fullName: form.data.fullName,
        address1: form.data.address1,
        address2: form.data.address2,
        city: form.data.city,
        postalCode: form.data.postalCode,
        country: form.data.countryCode,
        phoneNumber: form.data.phoneNumber,
      });

      return message(form, 'Address updated successfully');
    } catch (e) {
      console.log({ e });

      return message(form, 'Something went wrong, please try again.', {
        status: 500,
      });
    }
  },
};
