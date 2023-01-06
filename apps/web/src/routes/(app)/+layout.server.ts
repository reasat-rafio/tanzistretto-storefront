import type { LayoutServerLoad } from "./$types";
import { client } from "$lib/sanity-client";
import { error } from "@sveltejs/kit";
import { siteQuery } from "$lib/queries";

export const load: LayoutServerLoad = async () => {
  const data = await client.fetch(siteQuery);

  if (!data) {
    throw error(404, {
      message: "Not found",
    });
  }

  return { site: data };
};
