import { client } from "$lib/sanity-client";
import groq from "groq";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

const query = groq`*[_id == "page"][0]`;

export const load: LayoutServerLoad = async () => {
  // const data = await client.fetch(query);
  // if (!data) {
  //   throw error(404, {
  //     message: "Not found",
  //   });
  // }

  return { data: "hello" };
};
