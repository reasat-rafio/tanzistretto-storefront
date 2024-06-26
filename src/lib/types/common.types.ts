import type {
  SanityAsset,
  SanityImageObject,
} from '@sanity/image-url/lib/types/types';
import type { Slug } from 'sanity';

export interface SeoProps {
  _type: 'seo';
  title: string;
  description: string;
  ogImage: SanityAsset;
}

export interface Link {
  _type: 'link';
  title: string;
  type: 'internal' | 'external';
  internalLink?: string;
  externalLink?: string;
}

export type SanityImageWithAlt = SanityImageObject & {
  alt: string;
};

export interface Video {
  mov: string;
  webm: string;
}

export type NonNull<T> = T extends null | undefined ? never : T;

export type View =
  | 'default'
  | 'delivery-addresses'
  | 'add-delivery-address'
  | 'edit-delivery-address';
export type Direction = 'left' | 'right';

export interface Size {
  _id: string;
  name: string;
  value: Slug;
}
