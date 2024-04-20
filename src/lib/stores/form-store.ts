import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { z } from 'zod';
import type {
  addCustomerDeliveryAddress,
  updateCustomerDeliveryAddress,
} from '../utils/validators';

type AddCustomerDeliveryAddress = z.infer<typeof addCustomerDeliveryAddress>;
type UpdateCustomerDeliveryAddress = z.infer<
  typeof updateCustomerDeliveryAddress
>;
export type AddDeliveryAddressForm = SuperValidated<
  AddCustomerDeliveryAddress,
  any,
  AddCustomerDeliveryAddress
>;
export type UpdateDeliveryAddressForm = SuperValidated<
  UpdateCustomerDeliveryAddress,
  any,
  UpdateCustomerDeliveryAddress
>;

interface FormStore {
  addDeliveryAddressForm?: AddDeliveryAddressForm;
  updateDeliveryAddressForm?: UpdateDeliveryAddressForm;
}

const createFormStore = () => {
  const { subscribe, update } = writable<FormStore>({});

  function setAddDeliveryAddressForm(props: AddDeliveryAddressForm) {
    update((state) => {
      return { ...state, addDeliveryAddressForm: props };
    });
  }

  function setUpdateDeliveryAddressForm(props: UpdateDeliveryAddressForm) {
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
