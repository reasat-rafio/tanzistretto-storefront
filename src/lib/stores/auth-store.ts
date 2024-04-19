import type { User } from '$lib/types/common.types';
import type {
  signInReq,
  signUpReq,
  resetReq,
  forgotReq,
} from '$lib/utils/validators';
import { writable } from 'svelte/store';
import type { SuperForm } from 'sveltekit-superforms';
import { z } from 'zod';

interface AuthStore {
  user: User | null;
  signInForm?: SuperForm<z.infer<typeof signInReq>>;
  signUpForm?: SuperForm<z.infer<typeof signUpReq>>;
  forgotForm?: SuperForm<z.infer<typeof forgotReq>>;
  resetForm?: SuperForm<z.infer<typeof resetReq>>;
}

const createAuthStore = () => {
  const { subscribe, update } = writable<AuthStore>({
    user: null,
    signInForm: undefined,
    signUpForm: undefined,
    forgotForm: undefined,
    resetForm: undefined,
  });

  function setUser(props: User) {
    update((state) => {
      return { ...state, user: props };
    });
  }

  function setSignInForm(props: SuperForm<z.infer<typeof signInReq>>) {
    update((state) => {
      return { ...state, signInForm: props };
    });
  }

  function setSignUpForm(props: SuperForm<z.infer<typeof signUpReq>>) {
    update((state) => {
      return { ...state, signUpForm: props };
    });
  }

  function setForgotForm(props: SuperForm<z.infer<typeof forgotReq>>) {
    update((state) => {
      return { ...state, forgotForm: props };
    });
  }

  function setResetForm(props: SuperForm<z.infer<typeof resetReq>>) {
    update((state) => {
      return { ...state, resetForm: props };
    });
  }

  return {
    subscribe,
    setUser,
    setSignInForm,
    setSignUpForm,
    setForgotForm,
    setResetForm,
  };
};

export const authStore = createAuthStore();
