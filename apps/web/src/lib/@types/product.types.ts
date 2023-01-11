import type { Color, Slug } from "./global.types";
import type { SanityAsset } from "@sanity/image-url/lib/types/types";

export interface ProductProps {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  body: any[];
  categories: Category[];
  defaultProductVariant: DefaultProductVariant;
  materials: Category[];
  seo: SEO;
  slug: Slug;
  tags: string[];
  title: string;
  variants: DefaultProductVariant[];
}

export interface Category {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  slug: Slug;
  title: string;
}

export interface DefaultProductVariant {
  _type: string;
  color: Color;
  images: SanityAsset[];
  priceDetails: PriceDetail[];
  sizes: string[];
  title: string;
}

export interface PriceDetail {
  _key: string;
  _type: string;
  isFullSet?: boolean;
  names: string[];
  price: number;
}

export interface SEO {
  _type: string;
  description: string;
  ogImage: SanityAsset;
  title: string;
}
