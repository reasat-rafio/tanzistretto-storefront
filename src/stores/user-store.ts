import { User } from "@/types/common";
import { Region } from "@/types/medusa";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  countryCode: string;
  region: Region | null | undefined;
  setUser: (user: User | null) => void;
  setCountryCode: (countryCode: string) => void;
  setRegion: (region: Region | null | undefined) => void;
}

const useUserStore = create<UserStore>()((set) => ({
  user: null,
  countryCode: "bd",
  region: null,
  setUser: (user) => set(() => ({ user: user })),
  setCountryCode: (countryCode) =>
    set((state) => ({ countryCode: countryCode })),
  setRegion: (region) => set(() => ({ region: region })),
}));

export default useUserStore;
