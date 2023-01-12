import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = (async ({ locals, url }) => {
  if (url.pathname.startsWith("/my-account")) {
    if (!locals.session) {
      throw redirect(303, "/auth/login");
    }
  }
  return {};
}) satisfies PageServerLoad;
