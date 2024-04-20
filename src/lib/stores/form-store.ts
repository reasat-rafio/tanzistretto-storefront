import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { z } from 'zod';
import type { customerDeliveryAddress } from '../utils/validators';

type CustomerDeliveryAddress = z.infer<typeof customerDeliveryAddress>;
export type DeliveryAddressForm = SuperValidated<
  CustomerDeliveryAddress,
  any,
  CustomerDeliveryAddress
>;

interface FormStore {
  addDeliveryAddressForm?: DeliveryAddressForm;
  updateDeliveryAddressForm?: DeliveryAddressForm;
}

const createFormStore = () => {
  const { subscribe, update } = writable<FormStore>({});

  function setAddDeliveryAddressForm(
    props: SuperValidated<
      CustomerDeliveryAddress,
      any,
      CustomerDeliveryAddress
    >,
  ) {
    update((state) => {
      return { ...state, addDeliveryAddressForm: props };
    });
  }

  function setUpdateDeliveryAddressForm(
    props: SuperValidated<
      CustomerDeliveryAddress,
      any,
      CustomerDeliveryAddress
    >,
  ) {
    update((state) => {
      return { ...state, updateDeliveryAddressForm: props };
    });
  }

  return {
    subscribe,
    setAddDeliveryAddressForm,
    setUpdateDeliveryAddressForm,
  };
};

export const formStore = createFormStore();
