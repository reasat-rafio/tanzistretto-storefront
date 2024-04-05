import { error } from '@sveltejs/kit';
import { sanityClient } from '$lib/sanity/sanity-client';
import { siteQuery } from '$lib/sanity/query';
import type { SiteDataProps } from '$lib/types/site.types.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import {
  loginPostReq,
  registerPostReq,
  forgotPostReq,
  resetPostReq,
} from '$lib/utils/validators.js';

export const load = async ({ locals }) => {
  const data: SiteDataProps = await sanityClient.fetch(siteQuery);
  if (!data) throw error(404, { message: 'Not found' });

  const loginForm = await superValidate(zod(loginPostReq), { id: 'login' });
  const registerForm = await superValidate(zod(registerPostReq), {
    id: 'register',
  });
  const forgotForm = await superValidate(zod(forgotPostReq), { id: 'forgot' });
  const resetForm = await superValidate(zod(resetPostReq), { id: 'reset' });

  return {
    user: locals.user,
    site: data,
    signUpForm: registerForm,
    signInForm: loginForm,
    forgotForm: forgotForm,
    resetForm: resetForm,
  };
};
