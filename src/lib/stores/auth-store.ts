import { writable } from 'svelte/store';
import type { User } from 'lucia';
import type { address } from '../server/db/schema';

interface USerStore {
  user: User | null;
  deliveryAddress: (typeof address.$inferSelect)[] | null;
}

const createUserStore = () => {
  const { subscribe, update } = writable<USerStore>({
    user: null,
    deliveryAddress: null,
  });

  function setUser(props: User | null) {
    update((state) => {
      return { ...state, user: props };
    });
  }

  function setDeliveryAddress(props: (typeof address.$inferSelect)[] | null) {
    update((state) => {
      return { ...state, deliveryAddress: props };
    });
  }

  return {
    subscribe,
    setUser,
    setDeliveryAddress,
  };
};

export const userStore = createUserStore();
