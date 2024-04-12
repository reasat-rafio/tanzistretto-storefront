import { sanityClient } from '$lib/sanity/sanity-client';
import { asset } from '$lib/sanity/sanity-image';
import type { LandingPageProps } from '$lib/types/landing.types';
import groq from 'groq';
import type { PageServerLoad } from './$types';
import medusa from '$lib/server/medusa';

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
  const products = await medusa.getProducts({ limit: 1 });

  return {
    page: await getSanityHomePageData(),
    products,
  };
};
