import { User } from "@/types/common";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ user: user })),
}));

export default useUserStore;
