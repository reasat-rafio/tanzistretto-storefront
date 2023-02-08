import type { Color, Slug } from "./global.types";
import type { SanityAsset } from "@sanity/image-url/lib/types/types";

export interface ProductProps {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  categories: Category[];
  color: Color;
  images: SanityAsset[];
  materials: Category[];
  priceDetails: PriceDetail[];
  seo: SEO;
  sizes: string[];
  slug: Slug;
  tags: string[];
  title: string;
  variants?: Variant[];
  body?: any[];
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

export interface Variant {
  _id: string;
  images: SanityAsset[];
  slug: Slug;
  title: string;
}
