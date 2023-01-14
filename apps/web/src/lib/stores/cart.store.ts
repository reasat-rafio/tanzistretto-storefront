import { browser } from "$app/environment";
import type { SanityAsset } from "@sanity/image-url/lib/types/types";
import { writable } from "svelte/store";

interface ProductProps {
  _id: string;
  title: string;
  price: number;
  image: SanityAsset;
  quantity?: number;
}

// Get the value out of storage on load.
const stored = browser && localStorage?.cart;

// Set the stored value or a sane default.
export const cart = writable<ProductProps[]>(stored ? JSON.parse(stored) : []);

// Anytime the store changes, update the local storage value.
cart.subscribe((value) => {
  if (browser) localStorage.cart = JSON.stringify(value);
});

// add a item to the cart
export const addToCart = (product: ProductProps) => {
  cart.update((items) => {
    for (const item of items) {
      if (item._id === product._id) {
        if (item?.quantity) item.quantity += 1;
        return items;
      }
    }
    return [...items, { ...product, quantity: 1 }];
  });
};

// remove a item to the cart
export const removeFormCart = (_id: string) => {
  cart.update((items) => {
    for (const item of items) {
      if (item._id === _id) {
        if (item?.quantity && item.quantity > 1) {
          item.quantity -= 1;
          return items;
        }
      }
    }

    return items.filter((cartItem) => cartItem._id != _id);
  });
};

// clear cart
export const clearCart = () => cart.set([]);
