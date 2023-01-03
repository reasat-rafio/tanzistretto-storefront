import { client } from "$lib/sanity-client";
import groq from "groq";
import { error } from "@sveltejs/kit";

const query = groq`*[_id == "site"][0]`;

export const load = async () => {
  const data = await client.fetch(query);

  if (!data) {
    throw error(404, {
      message: "Not found",
    });
  }

  return { ...data };
};
