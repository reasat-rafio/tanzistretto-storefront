import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { LoginSchema } from "$lib/validations/login";
import { z } from "zod";

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const formData = Object.fromEntries(await request.formData());

    try {
      const { email, password, remember_me } = LoginSchema.parse(formData);
      const { data, error: err } = await locals.sb.auth.signInWithPassword({
        email,
        password,
      });

      if (err) {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        if (err instanceof AuthApiError && err.status === 400) {
          return fail(400, {
            error: "Invalid credentials",
          });
        }
        return fail(500, {
          message: "Server error. Try again later.",
        });
      }

      throw redirect(307, "/");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const { fieldErrors: errors } = err.flatten();

        return fail(400, {
          message: "Validation error",
          errors,
          data: formData,
        });
      }
    }
  },
};
