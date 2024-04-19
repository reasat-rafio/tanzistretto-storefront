// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { User } from '$lib/types/common.types';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      sid: string;
      cartid: string;
      user: any;
      cart: any;
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
