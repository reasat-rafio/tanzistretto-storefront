import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

const imageBuilder = createImageUrlBuilder({
  projectId: "12fv2wdd" ,
  dataset: "production",
});

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto("format").fit("max").url();
};

export const urlFor = (source: Image) => {
  return imageBuilder?.image(source);
};
