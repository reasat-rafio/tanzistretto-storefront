import { urlFor } from "$lib/sanity-client";
import type { SanityAsset } from "@sanity/image-url/lib/types/types";

export const replaceStateWithQuery = (values: Record<string, string>) => {
  const url = new URL(window.location.toString());
  for (const [k, v] of Object.entries(values)) {
    if (v) {
      url.searchParams.set(encodeURIComponent(k), encodeURIComponent(v));
    } else {
      url.searchParams.delete(k);
    }
  }
  history.replaceState({}, "", url);
};

export const makeOpenGraphImages = (
  ogImage: SanityAsset,
  metaTitle: string | undefined
) => {
  return ogImage
    ? [
        { w: 800, h: 600 },
        { w: 1200, h: 630 },
        { w: 600, h: 600 },
        { w: 256, h: 256 },
      ].map(({ w, h }) => ({
        url: `${urlFor(ogImage).width(w).height(h).url()}`,
        width: w,
        height: h,
        alt: `${metaTitle ?? "og image"}`,
      }))
    : [];
};
