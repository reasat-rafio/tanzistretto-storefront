import { writable } from 'svelte/store';

interface UIStore {
  authLoading: boolean;
}

const createUIStore = () => {
  const { subscribe, update } = writable<UIStore>({ authLoading: false });

  function setAuthLoading(loading: boolean) {
    update((state) => {
      return { ...state, authLoading: loading };
    });
  }

  return {
    subscribe,
    setAuthLoading,
  };
};

export const uiStore = createUIStore();
