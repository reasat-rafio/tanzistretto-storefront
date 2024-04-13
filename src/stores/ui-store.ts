import { create } from "zustand";

interface UIStore {
  authLoading: boolean;
  openUserSheet: boolean;
  openBagSheet: boolean;
  openMobileSheet: boolean;
  openSearchSheet: boolean;
  setAuthLoading: (loading: boolean) => void;
  setUserSheetOpen: (open: boolean) => void;
  setBagSheetOpen: (open: boolean) => void;
  setMobileSheetOpen: (open: boolean) => void;
  setSearchSheetOpen: (open: boolean) => void;
}

const useUiStore = create<UIStore>()((set) => ({
  authLoading: false,
  openUserSheet: false,
  openBagSheet: false,
  openMobileSheet: false,
  openSearchSheet: false,
  setAuthLoading: (loading) => set((state) => ({ authLoading: loading })),
  setUserSheetOpen: (open) => set((state) => ({ openUserSheet: open })),
  setBagSheetOpen: (open) => set((state) => ({ openBagSheet: open })),
  setMobileSheetOpen: (open) => set((state) => ({ openMobileSheet: open })),
  setSearchSheetOpen: (open) => set((state) => ({ openSearchSheet: open })),
}));

export default useUiStore;
