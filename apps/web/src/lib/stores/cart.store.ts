import type { SanityAsset } from "@sanity/image-url/lib/types/types";
import { writable } from "svelte/store";

interface ProductProps {
  _id: string;
  title: number;
  price: number;
  image: SanityAsset;
  quantity: number;
}

export const cart = writable<ProductProps[]>([]);

// add a item to the cart
export const addToCart = (product: ProductProps) => {
  cart.update((items) => {
    for (const item of items) {
      if (item._id === product._id) {
        item.quantity += 1;
        return items;
      }
    }
    return [...items, product];
  });
};
