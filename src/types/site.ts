import type { SanityImageWithAlt } from "./common";
import type { Image, PortableTextBlock } from "sanity";

export interface SiteDataProps {
  logos: {
    favicon: Image;
    ogImage: SanityImageWithAlt;
    logo: SanityImageWithAlt;
  };
  nav: Nav;
  footer: Footer;
  promotions: Promotion[];
}

export interface Promotion {
  _id: string;
  title: PortableTextBlock[];
}

export interface Nav {
  _rev: string;
  _type: string;
  _id: string;
  menu: Menu[];
  _updatedAt: Date;
  _createdAt: Date;
}

export interface Menu {
  _key: string;
  title: string;
  type: "internal" | "external";
  internalLink?: string;
  externalLink?: string;
  subLinks?: SubLinks[];
}

export type SubLinks = MenuSubLink | MenuPoster;

export interface MenuSubLink {
  _key: string;
  _type: "links";
  links: { title: string; link: string }[];
}

export interface MenuPoster {
  _key: string;
  _type: "poster";
  title: string;
  subtitle?: string;
  image: SanityImageWithAlt;
  link: string;
}

export interface Footer {
  title: string;
  subtitle: string;
  contacts: Contact[];
  social: SocialProps;
}

export interface SocialProps {
  title: string;
  socials: Social[];
}

export interface Contact {
  _type: string;
  _key: string;
  name: string;
  value: string;
  url?: string;
}

export interface Social {
  _type: string;
  _key: string;
  name: string;
  url: string;
}
