import { sanityClient } from '$lib/sanity/sanity-client';
import { asset } from '$lib/sanity/sanity-image';
import type { LandingPageProps } from '$lib/types/landing.types';
import groq from 'groq';
import type { PageServerLoad } from './$types';
import getOurFavoritesCollection from '$lib/server/vendure/collections/getOurFavoritesCollection';

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
  return {
    page: await getSanityHomePageData(),
    favoriteCollection: await getOurFavoritesCollection(),
  };
};
