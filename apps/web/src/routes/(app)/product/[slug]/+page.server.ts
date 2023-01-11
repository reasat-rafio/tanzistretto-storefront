import { error } from "@sveltejs/kit";
import groq from "groq";
import type { PageServerLoad } from "./$types";
import { sanity_client } from "$lib/sanity-client";

const query = (slug: string) => groq`{
 "product" : *[_type == "product" && slug.current == "${slug}"][0]{
    ...,
    categories[]->,
    materials[]->,
  }
}`;

export const load = (async ({ params }) => {
  const data = await sanity_client.fetch(query(params.slug));

  if (!data?.product) {
    throw error(404, {
      message: "Not found",
    });
  }

  return {
    data: data.product,
  };
}) satisfies PageServerLoad;
