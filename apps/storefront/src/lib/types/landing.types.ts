import type { Link, SanityImageWithAlt, SeoProps } from './common.types';
import type { PortableTextBlock } from '@portabletext/types';

export interface LandingPageProps {
  seo: SeoProps;
  sections: Section[];
}

type Section = HeroProps;

export interface HeroProps {
  _type: 'landing.hero';
  banners: Banner[];
}

export interface Banner {
  image: SanityImageWithAlt;
  title: string;
  subtitle?: PortableTextBlock[];
  link: Link;
}
