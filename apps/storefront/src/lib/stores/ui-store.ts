import { writable } from 'svelte/store';

interface UIStore {
  authLoading: boolean;
  openUserSheet: boolean;
  openBagSheet: boolean;
  openMobileSheet: boolean;
}

const createUIStore = () => {
  const { subscribe, update, set } = writable<UIStore>({
    authLoading: false,
    openUserSheet: false,
    openBagSheet: false,
    openMobileSheet: false,
  });

  function setAuthLoading(loading: boolean) {
    update((state) => {
      return { ...state, authLoading: loading };
    });
  }

  function setUserSheetOpen(open: boolean) {
    update((state) => {
      return { ...state, openUserSheet: open };
    });
  }

  function setBagSheetOpen(open: boolean) {
    update((state) => {
      return { ...state, openBagSheet: open };
    });
  }

  function setMobileSheetOpen(open: boolean) {
    update((state) => {
      return { ...state, openMobileSheet: open };
    });
  }

  return {
    subscribe,
    set,
    update,
    setAuthLoading,
    setUserSheetOpen,
    setBagSheetOpen,
    setMobileSheetOpen,
  };
};

export const uiStore = createUIStore();
