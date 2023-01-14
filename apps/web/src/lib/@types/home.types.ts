import type { SanityAsset } from "@sanity/image-url/lib/types/types";

export interface HeroProps {
  highlights: Highlight[];
}

export interface Highlight {
  _key: string;
  _type: string;
  image: SanityAsset;
  title: string[];
  textColor: "dark" | "light";
}
