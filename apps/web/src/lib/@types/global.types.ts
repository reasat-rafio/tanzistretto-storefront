import type { SanityAsset } from "@sanity/image-url/lib/types/types";

export interface PageData<T> {
  session: import("@supabase/supabase-js").Session | null;
  site: Site;
  data: T;
}

export interface Site {
  logos: Logos;
  nav: Nav;
}

export interface Logos {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  favicon: SanityAsset;
  logo: SanityAsset;
  logoDark: SanityAsset;
  ogImage: SanityAsset;
}

export interface Favicon {
  _type: string;
  asset: Asset;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export interface Nav {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  menu: Menu[];
}

export interface Menu {
  _key: string;
  _type: string;
  pageUrl: string;
  title: string;
  highlight?: boolean;
}

export interface IFormError {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
}

export interface Slug {
  _type: string;
  current: string;
}
export interface Color {
  _type: string;
  alpha: number;
  hex: string;
  hsl: Hsl;
  hsv: Hsl;
  rgb: RGB;
}

export interface Hsl {
  _type: string;
  a: number;
  h: number;
  l?: number;
  s: number;
  v?: number;
}

export interface RGB {
  _type: string;
  a: number;
  b: number;
  g: number;
  r: number;
}