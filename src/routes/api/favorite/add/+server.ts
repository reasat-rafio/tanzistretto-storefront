import { sanityClient } from '$lib/sanity/sanity-client.js';
import { db } from '$lib/server/db/db.js';
import { favorite } from '$lib/server/db/schema.js';
import { error, json } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import groq from 'groq';
import { generateId } from 'lucia';

export async function POST({ request, locals }) {
  const { setId } = await request.json();

  try {
    const productExists = await sanityClient.fetch(
      groq`*[_type == "set" && _id == $setId][0]{
            _id
      }`,
      { setId },
    );
    if (!productExists) return error(404, { message: 'Product not found' });

    if (!locals.user) {
      return error(401, {
        message: 'You need to be  logged in to add to favorites',
      }); // this shouldn't happen because of client-side validation
    }

    const favoriteExists = await db.query.favorite.findFirst({
      where: and(
        eq(favorite.productId, setId),
        eq(favorite.userId, locals.user.id),
      ),
    });

    if (favoriteExists) {
      return json({ message: 'Product is already in favorites' });
    }

    await db.insert(favorite).values({
      id: generateId(40),
      productId: setId,
      userId: locals.user.id,
    });

    return json({ message: 'Product added to favorites' });
  } catch (err) {
    console.log(err);
    return error(500, {
      message: 'Something went wrong, please try again.',
    });
  }
}
