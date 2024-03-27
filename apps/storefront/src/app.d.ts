// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      config: SalunaConfig;
      sid: string; // session id
      ssig: string; // session signature
      token: string; // vendure auth token
      user: unknown;
      cart: unknown;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
