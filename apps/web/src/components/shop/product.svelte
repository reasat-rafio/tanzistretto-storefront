<script lang="ts">
  import type { Product } from "$lib/@types/shop.types";
  import HeartIcon from "$components/icons/heart-icon.svelte";
  import SanityImage from "$components/sanity-image.svelte";
  import { TAKA_SYMBOL } from "$lib/helpers/constants";

  export let product: Product;
  const { _id, slug, images, title, priceDetails, color, variants } = product;

  const _variants = variants || [];
  const colors = [{ _id, slug, color }, ..._variants];

  let selectedColor = colors[0];
</script>

<li class="odd:mt-10">
  <a href="/product/{slug.current}">
    <figure class="overflow-hidden">
      <SanityImage
        class="max-h-[550px] h-full w-full object-cover aspect-square "
        maxWidth={500}
        image={images[0]}
      />
    </figure>
    <section class="flex flex-col space-y-3">
      <h3
        class="product_title | relative | mt-5 pt-5 | text-4xl font-light font-title leading-none "
      >
        {title}
      </h3>

      <ul class="space-x-2 flex">
        {#each colors as color}
          <li class="relative">
            <button
              on:click|stopPropagation|preventDefault={() =>
                (selectedColor = color)}
              style="background-color: {color.color.hex};"
              class="h-7 w-7 rounded-full outline-none"
            />
            {#if selectedColor._id === color._id}
              <span
                class="w-full h-1 rounded-lg bg-primary absolute bottom-0 left-0"
              />
            {/if}
          </li>
        {/each}
      </ul>

      <span class="text-xl"
        >{priceDetails.filter((e) => e?.isDefault)[0].price}
        {TAKA_SYMBOL}</span
      >
      <div class="flex justify-between items-center">
        <button
          class="btn btn-md btn-wide btn-outline | !border-secondary hover:!bg-secondary text-secondary | font-body font-light text-base | duration-700"
          >View Product</button
        >
        <HeartIcon class="h-7 w-7" />
      </div>
    </section>
  </a>
</li>

<style>
  .product_title::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 80%;
    height: 1px;
    background-color: #8b8b8b;
  }
</style>
