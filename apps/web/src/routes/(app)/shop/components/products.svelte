<script lang="ts">
  import type { Product } from "$lib/@types/shop.types";
  import HeartIcon from "$lib/components/icons/heart-icon.svelte";
  import SanityImage from "$lib/components/sanity-image.svelte";
  import { TAKA_SYMBOL } from "$lib/helpers/constants";

  export let products: Product[];
</script>

<section>
  <ul class="grid grid-cols-2 gap-20">
    {#each products as { _id, title, defaultProductVariant: { images, priceDetails }, slug } (_id)}
      <li class="odd:mt-10">
        <a href="/product/{slug.current}">
          <figure class="overflow-hidden">
            <SanityImage
              class="max-h-[550px] h-full w-full object-cover aspect-square "
              maxWidth={500}
              image={images[0]}
            />
          </figure>

          <section class="flex flex-col">
            <h3
              class="product_title | relative | mt-5 py-5 | text-4xl font-light font-title leading-none "
            >
              {title}
            </h3>
            <span class="text-xl"
              >{priceDetails.filter((e) => e?.isFullSet)[0].price}
              {TAKA_SYMBOL}</span
            >
            <div class="flex justify-between items-center py-5">
              <!-- TODO add common button variant -->
              <button
                class="btn btn-wide btn-outline | !border-secondary hover:!bg-secondary text-secondary | font-body font-light text-base | duration-700"
                >View Product</button
              >
              <HeartIcon class="h-7 w-7" />
            </div>
          </section>
        </a>
      </li>
    {/each}
  </ul>
</section>

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
