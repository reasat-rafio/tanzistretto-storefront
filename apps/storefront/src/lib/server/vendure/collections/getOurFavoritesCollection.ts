import { query } from '$lib/server/vendure';
import { gql } from '$lib/generated';
import type { GetOurFavoritesCollectionQuery } from '$lib/generated/graphql';

export default async function getOurFavoritesCollection(): Promise<
  GetOurFavoritesCollectionQuery['collection']
> {
  const GetOurFavoritesCollection = gql(`
		query GetOurFavoritesCollection($slug: String!) {
			collection(slug: $slug) {
				name
				slug
				productVariants {
					items {
						customFields {
          					markDefault
        				}
						id
						name
						price
        				priceWithTax
						product {
							name
          					slug
							id
							customFields{
								displayNewTag
							}
							facetValues {
								name
								code
								facet {
									name
								}
							}
        				}
						facetValues {
							name
							code
							facet {
								name
							}
						}
						assets {
							source
						}
					}
				}
			}
		}

  `);

  return await query({
    document: GetOurFavoritesCollection,
    variables: { slug: 'our-favorites' },
  })
    .then((response) => response?.json())
    .then((body) => body?.data?.collection)
    .catch((e) => {
      console.log(e);
      return null;
    });
}
