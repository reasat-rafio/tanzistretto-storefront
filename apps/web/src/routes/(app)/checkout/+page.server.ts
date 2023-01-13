import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import { z } from "zod";
import { PlaceOrderSchema } from "$lib/validations/place_order";

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  place_order: async ({ request, locals, url }) => {
    const formData = Object.fromEntries(await request.formData());

    try {
      const res = PlaceOrderSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const { fieldErrors: errors } = error.flatten();
        return fail(403, {
          message: "Validation error",
          errors,
          data: formData,
        });
      }
    }
  },
};
