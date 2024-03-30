import { error } from '@sveltejs/kit';
import { sanityClient } from '$lib/sanity/sanity-client';
import { siteQuery } from '$lib/sanity/query';
import type { SiteDataProps } from '$lib/types/site.types.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import {
  forgotReq,
  resetReq,
  signInReq,
  signUpReq,
} from '$lib/utils/validators.js';

export const load = async ({ locals }) => {
  const data: SiteDataProps = await sanityClient.fetch(siteQuery);
  if (!data) throw error(404, { message: 'Not found' });

  const signInForm = await superValidate(zod(signInReq), { id: 'signIn' });
  const signUpForm = await superValidate(zod(signUpReq), { id: 'signUp' });
  const forgotForm = await superValidate(zod(forgotReq), { id: 'forgot' });
  const resetForm = await superValidate(zod(resetReq), { id: 'reset' });

  return {
    user: locals.user,
    site: data,
    signUpForm,
    signInForm,
    forgotForm,
    resetForm,
  };
};
