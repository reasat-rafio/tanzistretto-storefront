import type { Slug } from 'sanity';
import type { Link, SanityImageWithAlt, SeoProps, Size } from './common.types';
import type { PortableTextBlock } from '@portabletext/types';
import type { ColorValue } from '@sanity/color-input';

export interface LandingPageProps {
  seo: SeoProps;
  sections: Section[];
  sizes: Size[];
}

type Section = HeroProps | CollectionProps;

export interface HeroProps {
  _type: 'landing.hero';
  banners: Banner[];
}

export interface Banner {
  _key: string;
  image: SanityImageWithAlt;
  title: string;
  subtitle?: PortableTextBlock[];
  link: Link;
}

export interface CollectionProps {
  _type: 'landing.collection';
  collection: Collection;
  _key: string;
}

export interface Collection {
  active: boolean;
  isNew: boolean;
  slug: Slug;
  sets: Set[];
  title: string;
}

export interface Set {
  _id: string;
  variants: Variant[];
  slug: Slug;
  price: number;
  mainImage: SanityImageWithAlt;
  outOfStock: boolean;
  title: string;
  active?: boolean;
  isNew?: boolean;
}

export interface Variant {
  _key: string;
  price?: number;
  images?: SanityImageWithAlt[];
  color: { color: ColorValue; name: string; value: Slug };
  products: ProductElement[];
}

export interface ProductElement {
  color: { color: ColorValue; name: string; value: Slug };
  product: ProductProduct;
}

export interface ProductProduct {
  _id: string;
  slug: Slug;
}
