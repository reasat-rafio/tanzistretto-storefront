import { sanityClient } from '$lib/sanity/sanity-client';
import { asset } from '$lib/sanity/sanity-image';
import { db } from '$lib/server/db/db';
import { address } from '$lib/server/db/schema';
import type { LandingPageProps } from '$lib/types/landing.types';
import {
  addCustomerDeliveryAddress,
  updateCustomerDeliveryAddress,
} from '$lib/utils/validators';
import type { Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import groq from 'groq';
import { generateId } from 'lucia';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';

async function getSanityHomePageData(): Promise<LandingPageProps> {
  const sanityQuery = groq`
	*[_id == "landingPage"][0]{
		...,
    "sizes" : *[_type == "size"]|order(orderRank)[]{
      _id,
      name,
      value
    },
		sections[] {
			...,
			${asset('image')},
      collection->{
        title,
        active,
        slug,
        isNew,
        slug,
        sets[0...10]->{
          _id,
          title,
          slug,
          active,
          isNew,
          outOfStock,
          price,
          ${asset('mainImage')},
          variants[]{
            _key,
            price,
            ${asset('images[]', { as: 'images' })},
            color->{
              name,
              color,
              value
            },
            products[] {
              color->{
                name,
                color,
                value
              },
              product-> {
                _id,
                slug,
              }
            }
          },
        }
      }
		},
	}
`;

  return await sanityClient.fetch(sanityQuery).catch(() => null);
}

export const load: PageServerLoad = async () => {
  return {
    page: await getSanityHomePageData(),
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
