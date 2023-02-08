import { AuthApiError, type Provider } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { RegisterSchema } from "$lib/validations/register";
import { z } from "zod";

const OAUTH_PRVIDERS = ["google", "facebook"];
export const actions: Actions = {
  register: async ({ request, locals, url }) => {
    const formData = Object.fromEntries(await request.formData());
    const provider = url.searchParams.get("provider") as Provider;

    try {
      const { email, password, username } = RegisterSchema.parse(formData);
      if (provider && OAUTH_PRVIDERS.includes(provider)) {
        const { data, error: err } = await locals.sb.auth.signInWithOAuth({
          provider: provider,
        });

        if (err) {
          return fail(400, {
            message: "something went wrong",
          });
        }

        throw redirect(303, data.url);
      }

      const { data, error: err } = await locals.sb.auth.signUp({
        email,
        password,
        options: { data: { username } },
      });

      if (err) {
        if (err instanceof AuthApiError && err.status === 400) {
          return fail(400, {
            error: "Invalid email or password",
          });
        }
        return fail(500, {
          error: "Server error. Please try again later.",
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const { fieldErrors: errors } = err.flatten();
        return fail(403, {
          message: "Validation error",
          errors,
          data: formData,
        });
      }
    }
    throw redirect(307, "/");
  },
};
