import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email must be a valid email address" }),
  password: z.string({ required_error: "Password is required" }).trim(),
  terms: z.enum(["on"], {
    required_error: "You must accept the terms and conditions",
  }),
});

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    const { data, error: err } = await locals.sb.auth.signInWithPassword({
      email: body.email as string,
      password: body.password as string,
    });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          error: "Invalid credentials",
        });
      }
      return fail(500, {
        message: "Server error. Try again later.",
      });
    }

    throw redirect(303, "/");
  },
};
