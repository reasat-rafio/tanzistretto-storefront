<script lang="ts">
  import type { ProductProps } from "$lib/@types/product.types";
  import SanityImage from "$components/sanity-image.svelte";
  import { getContext } from "svelte";

  const { images } = getContext("product") as ProductProps;
</script>

<section class="bg-red-300">
  {#each images as image}
    <figure>
      <SanityImage
        maxWidth={1000}
        class="w-full h-full object-contain"
        {image}
      />
    </figure>
  {/each}
</section>
