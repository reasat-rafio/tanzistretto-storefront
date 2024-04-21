import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
  projectId: '12fv2wdd',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: process.env.NODE_ENV === 'production',
});

export const imgBuilder = imageUrlBuilder(sanityClient);

export const urlFor = (source: SanityImageSource) => {
  return imgBuilder.image(source);
};
