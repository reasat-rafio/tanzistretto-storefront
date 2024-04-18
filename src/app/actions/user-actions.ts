"use server";

import { addShippingAddress } from "@/lib/medusa/data";
import { StorePostCustomersCustomerAddressesReq } from "@medusajs/medusa";
import { revalidateTag } from "next/cache";

export async function addCustomerShippingAddress(
  _currentState: Record<string, unknown>,
  formData: FormData
) {
  const customer = {
    address: {
      first_name: formData.get("firstName") as string,
      last_name: formData.get("lastName") as string,
      company: formData.get("company") as string,
      address_1: formData.get("address_1") as string,
      address_2: formData.get("address_2") as string,
      city: formData.get("city") as string,
      postal_code: formData.get("postalCode") as string,
      country_code: formData.get("countryCode") as string,
      phone: formData.get("phone") as string,
    },
  } as StorePostCustomersCustomerAddressesReq;

  console.log({ customer });
  try {
    await addShippingAddress(customer).then(() => {
      revalidateTag("customer");
    });
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.toString() };
  }
}
