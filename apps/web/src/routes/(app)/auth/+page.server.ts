import {
  forgotPostReq,
  loginPostReq,
  registerPostReq,
  resetPostReq,
} from '$lib/utils/validators';
import { error, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from '../$types';
import medusa from '$lib/server/medusa';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
  const rurl = url.searchParams.get('rurl') || '';
  const code = url.searchParams.get('code') || '';

  if (locals.user) {
    throw redirect(302, `/${rurl}`);
  }

  const loginForm = await superValidate(zod(loginPostReq), { id: 'login' });
  const registerForm = await superValidate(zod(registerPostReq), {
    id: 'register',
  });
  const forgotForm = await superValidate(zod(forgotPostReq), { id: 'forgot' });
  const resetForm = await superValidate(zod(resetPostReq), { id: 'reset' });

  return {
    rurl,
    code,
    loginForm,
    registerForm,
    forgotForm,
    resetForm,
  };
};

export const actions: Actions = {
  login: async ({ request, locals, cookies }) => {
    const form = await superValidate(request, zod(loginPostReq), {
      id: 'login',
    });
    if (!form.valid) {
      return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation
    }

    if (
      await medusa.login(locals, cookies, form.data.email, form.data.password)
    ) {
      throw redirect(302, `/${form.data.rurl}`);
    } else {
      return message(form, 'Invalid email/password combination', {
        status: 401,
      });
    }
  },

  register: async ({ request, locals, cookies }) => {
    const form = await superValidate(request, zod(registerPostReq), {
      id: 'register',
    });

    const user = {
      first_name: form.data.firstName,
      last_name: form.data.lastName,
      email: form.data.email,
      password: form.data.password,
    };

    if (await medusa.register(locals, cookies, user)) {
      throw redirect(302, `/${form.data.rurl}`);
    } else {
      return message(
        form,
        'Unable to register a new user with that email address',
        { status: 400 },
      );
    }
  },

  forgot: async ({ request }) => {
    const form = await superValidate(request, zod(forgotPostReq), {
      id: 'forgot',
    });

    if (!form.valid)
      return message(form, 'Something went wrong', { status: 500 });

    if (await medusa.requestResetPassword(form.data.email)) {
      return message(
        form,
        'If an account with that email exists, a reset code has been sent to your email address',
      );
    } else {
      return message(form, 'Unable to send reset code', { status: 400 });
    }
  },

  reset: async ({ request, locals, cookies }) => {
    const form = await superValidate(request, zod(resetPostReq), {
      id: 'reset',
    });
    if (!form.valid)
      return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation

    if (
      await medusa.resetPassword(
        form.data.email,
        form.data.password,
        form.data.code,
      )
    ) {
      if (
        await medusa.login(locals, cookies, form.data.email, form.data.password)
      ) {
        throw redirect(302, `/${form.data.rurl}`);
      }
    } else {
      return message(form, 'The link was expired or invalid.', { status: 400 });
    }
  },

  logout: async ({ locals, cookies }) => {
    if (await medusa.logout(locals, cookies)) {
      throw redirect(302, '/auth');
    } else throw error(500, 'server error');
  },
};
