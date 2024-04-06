// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { User } from '$lib/types/common.types';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      config: SalunaConfig;
      sid: string; // session id
      ssig: string; // session signature
      token: string; // vendure auth token
      user?: object;
      cart: unknown;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  declare namespace svelteHTML {
    interface HTMLAttributes<T> {
      'on:clickOutside'?: CompositionEventHandler<T>;
    }
  }
}

export {};
