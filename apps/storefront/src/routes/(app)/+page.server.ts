import { sanityClient } from '$lib/sanity/sanity-client';
import { asset } from '$lib/sanity/sanity-image';
import type { LandingPageProps } from '$lib/types/landing.types';
import groq from 'groq';
import type { PageServerLoad } from './$types';
import { query } from '$lib/server/vendure';
import { gql } from '$lib/generated';
import type { GetOurFavoritesCollectionQuery } from '$lib/generated/graphql';

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

async function getOurFavoritesCollection(): Promise<
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

export const load: PageServerLoad = async () => {
  return {
    page: await getSanityHomePageData(),
    favoriteCollection: await getOurFavoritesCollection(),
  };
};
