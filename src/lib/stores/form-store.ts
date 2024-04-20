import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { z } from 'zod';
import type { customerDeliveryAddress } from '$lib/utils/validators';

type CustomerDeliveryAddress = z.infer<typeof customerDeliveryAddress>;

interface FormStore {
  deliveryAddressForm?: SuperValidated<
    CustomerDeliveryAddress,
    any,
    CustomerDeliveryAddress
  >;
}

const createFormStore = () => {
  const { subscribe, update } = writable<FormStore>({});

  function setDeliveryAddressForm(
    props: SuperValidated<
      CustomerDeliveryAddress,
      any,
      CustomerDeliveryAddress
    >,
  ) {
    update((state) => {
      return { ...state, deliveryAddressForm: props };
    });
  }

  return {
    subscribe,
    setDeliveryAddressForm,
  };
};

export const formStore = createFormStore();
