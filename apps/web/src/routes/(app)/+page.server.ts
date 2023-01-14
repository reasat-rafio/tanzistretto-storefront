import { sanity_client } from "$lib/sanity-client";
import groq from "groq";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

const query = groq`*[_id == "homePage"][0]`;

export const load: LayoutServerLoad = async () => {
  const data = await sanity_client.fetch(query);
  if (!data) {
    throw error(404, {
      message: "Not found",
    });
  }

  return { page: data };
};
