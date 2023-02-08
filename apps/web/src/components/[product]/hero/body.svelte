<script lang="ts">
  import { PortableText } from "@portabletext/svelte";
  import type { ProductProps } from "$lib/@types/product.types";
  import { getContext, onMount } from "svelte";
  import HeartIcon from "$components/icons/heart-icon.svelte";
  import { navbarHeight } from "$lib/stores/global.store";
  import { addToCart } from "$lib/stores/cart.store";

  const { _id, title, body, images, priceDetails } = getContext(
    "product"
  ) as ProductProps;

  const addToTheCart = () =>
    addToCart({ _id, price: priceDetails[0].price, title, image: images[0] });

  const browser = import.meta.env?.SSR ?? typeof window !== "undefined";

  let top = 0;
  onMount(() => {
    top = $navbarHeight;
  });
</script>

<section
  style="top: {top + 20}px; height: calc(100vh - {top}px);"
  class="max-w-3xl w-full | sticky self-start | flex flex-col justify-center items-center | space-y-5 px-5 mx-auto"
>
  <h1 class="text-7xl">{title}</h1>
  <div>
    {#if !!body?.length && browser}
      <div class="prose">
        <PortableText value={body} />
      </div>
    {/if}
  </div>

  <div class="flex justify-between items-center py-5 w-full">
    <button
      on:click={addToTheCart}
      class="btn btn-wide border-secondary bg-secondary  font-body text-base duration-700"
      >Add to the cart</button
    >
    <HeartIcon class="h-9 w-9" />
  </div>
</section>
