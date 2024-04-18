"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import {
  Customer,
  StorePostCustomersCustomerAddressesAddressReq,
  StorePostCustomersCustomerAddressesReq,
  StorePostCustomersCustomerReq,
  StorePostCustomersReq,
} from "@medusajs/medusa";

import {
  addShippingAddress,
  authenticate,
  createCustomer,
  deleteShippingAddress,
  getToken,
  updateCustomer,
  updateShippingAddress,
} from "@/lib/medusa/data";

export async function registerUser(_currentState: unknown, formData: FormData) {
  const customer = {
    email: formData.get("email"),
    password: formData.get("password"),
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
  } as StorePostCustomersReq;

  try {
    await createCustomer(customer);
    await getToken({ email: customer.email, password: customer.password }).then(
      () => {
        revalidateTag("customer");
      }
    );
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.toString() };
  }
}

export async function loginUser(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await getToken({ email, password }).then(() => {
      revalidateTag("customer");
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.toString() };
  }
}

export async function signOutUser(countryCode?: string) {
  cookies().set("_medusa_jwt", "", {
    maxAge: -1,
  });
  revalidateTag("auth");
  revalidateTag("customer");
  // redirect(`/${countryCode}/account`);
}
