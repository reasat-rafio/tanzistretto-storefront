<script lang="ts">
  import type { ProductProps } from "$lib/@types/product.types";
  import { getContext } from "svelte";
  import { PortableText } from "@portabletext/svelte";
  import HeartIcon from "$lib/components/icons/heart-icon.svelte";
  import { navbarHeight } from "$lib/stores/global.store";
  import { addToCart, cart } from "$lib/stores/cart.store";

  const { _id, title, body }: ProductProps = getContext("product");
  $: console.log($cart);

  const addToTheCart = () => {
    // addToCart({ _id: "asd", price: 12, quantity: 1 });
  };
</script>

<section
  style="top: {$navbarHeight + 20}px; height: calc(100vh - {$navbarHeight}px);"
  class="max-w-3xl w-full | sticky self-start | flex flex-col justify-center items-center | space-y-5 px-5 mx-auto"
>
  <h1 class="text-7xl">{title}</h1>
  <div>
    <PortableText value={body} />
  </div>

  <div class="flex justify-between items-center py-5 w-full">
    <button
      on:click={addToTheCart}
      class="btn btn-wide btn-outline | !border-secondary hover:!bg-secondary text-secondary | font-body font-light text-base | duration-700"
      >Add to the cart</button
    >
    <HeartIcon class="h-9 w-9" />
  </div>
</section>
