import type { SanityAsset } from "@sanity/image-url/lib/types/types";
import type { Color, Slug } from "./global.types";

export interface ShopPageProps {
  categories: Category[];
  materials: Category[];
  products: Product[];
}

export interface Category {
  _id: string;
  slug: Slug;
  title: string;
}

export interface Product {
  _id: string;
  categories: Category[];
  defaultProductVariant: DefaultProductVariant;
  materials: Category[];
  slug: Slug;
  title: string;
  variants?: DefaultProductVariant[];
}

export interface DefaultProductVariant {
  color: Color;
  priceDetails: PriceDetailsProps[];
  images: SanityAsset[];
}

export interface PriceDetailsProps {
  _key: string;
  _type: string;
  isFullSet?: boolean;
  names: string[];
  price: number;
}

export interface Asset {
  _ref: string;
  _type: string;
}
