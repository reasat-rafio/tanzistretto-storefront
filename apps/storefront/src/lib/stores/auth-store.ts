import type { User } from '$lib/types/common.types';
import { writable } from 'svelte/store';

interface AuthStore {
  user: User | null;
  signInForm: unknown;
  signUpForm: unknown;
  forgotForm: unknown;
  resetForm: unknown;
}

const createAuthStore = () => {
  const { subscribe, update } = writable<AuthStore>({
    user: null,
    signInForm: null,
    signUpForm: null,
    forgotForm: null,
    resetForm: null,
  });

  function setUser(props: User) {
    update((state) => {
      return { ...state, user: props };
    });
  }

  function setSignInForm<T>(props: T) {
    update((state) => {
      return { ...state, signInForm: props };
    });
  }

  function setSignUpForm<T>(props: T) {
    update((state) => {
      return { ...state, signUpForm: props };
    });
  }

  function setForgotForm<T>(props: T) {
    update((state) => {
      return { ...state, forgotForm: props };
    });
  }

  function setResetForm<T>(props: T) {
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
