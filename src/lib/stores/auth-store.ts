import { writable } from 'svelte/store';
import type { User } from 'lucia';

interface AuthStore {
  user: User | null;
}

const createAuthStore = () => {
  const { subscribe, update } = writable<AuthStore>({
    user: null,
  });

  function setUser(props: User | null) {
    update((state) => {
      return { ...state, user: props };
    });
  }

  return {
    subscribe,
    setUser,
  };
};

export const authStore = createAuthStore();
