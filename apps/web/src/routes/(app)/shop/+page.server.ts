import { error } from "@sveltejs/kit";
import { sanity_client } from "$lib/sanity-client";
import groq from "groq";
import type { PageServerLoad } from "../$types";

const query = groq`{
  "products": *[_type == "product"][]{
    _id,
    title,
    slug,
    categories[]->{
      _id,
      title,
      slug
    },
    materials[]->{
      _id,
      title,
      slug
    },
    defaultProductVariant {
        priceDetails,
        color,
        images,
    },
    variants[]{
        _id,
        fullSetPrice,
        color,
        "images": images[0],
    }
  },
  "categories": *[_type == "category"][]{
    _id,
    title, 
    slug
  },
  "materials": *[_type == "material"][]{
    _id,
    title, 
    slug
  }
}`;

export const load: PageServerLoad = async () => {
  const data = await sanity_client.fetch(query);

  if (!data) {
    throw error(404, {
      message: "Not found",
    });
  }

  return {
    data: data,
  };
};
