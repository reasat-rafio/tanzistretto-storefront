<script lang="ts">
  import type { ProductProps } from "$lib/@types/product.types";
  import SanityImage from "$lib/components/sanity-image.svelte";
  import { getContext } from "svelte";

  const { defaultProductVariant, variants } = getContext(
    "product"
  ) as ProductProps;
</script>

<section class="bg-red-300">
  {#each [defaultProductVariant, ...variants] as { images }}
    {#each images as image}
      <figure>
        <SanityImage
          maxWidth={1000}
          class="w-full h-full object-contain"
          {image}
        />
      </figure>
    {/each}
  {/each}
</section>
