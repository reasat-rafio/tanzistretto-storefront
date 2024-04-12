import { getCollectionProducts } from '$lib/server/vendure/getCollectionProducts.graphql';
import { getCollections } from '$lib/server/vendure/getCollections.graphql';
import type { PageServerLoad } from './$types';

export const load = async function ({ params }) {
  return {
    collection: await getCollections(),
    products: await getCollectionProducts(params.slug),
  };
} satisfies PageServerLoad;
