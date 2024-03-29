<script lang="ts">
  import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
  // import * as Carousel from '$lib/components/ui/carousel/index.js';
  import type { GroupedFavProduct } from '$lib/types/landing.types';
  import Color from './color.svelte';
  import MakeFavoriteWidget from './make-favorite-widget.svelte';
  import Controls from './controls.svelte';
  import Images from './images.svelte';
  import SelectSizeWidget from './select-size-widget.svelte';

  export let item: GroupedFavProduct;

  let api: CarouselAPI;
  let isHovered = false;
  let activeVariant: GroupedFavProduct['variants'][0] | null = null;
  $: ({ name, slug, variants } = item);
  $: reactiveActiveVariant = activeVariant ?? variants[0];
</script>

<div
  role="button"
  tabindex="0"
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
  class=" group space-y-3 p-1">
  <div class="bg-muted relative block h-[22rem] overflow-hidden rounded-3xl">
    <MakeFavoriteWidget />
    <Images bind:api {name} {slug} {reactiveActiveVariant} />
    <SelectSizeWidget />
    {#if reactiveActiveVariant?.assets?.length > 1}
      <Controls {api} />
    {/if}
  </div>
  <div class="text-base">
    <a href="/products/{slug}" class="mb-2 font-medium">{name}</a>
    <h5 class="font-semibold">৳{reactiveActiveVariant?.priceWithTax}</h5>

    <div class="mt-2 flex gap-x-3">
      {#each variants as variant}
        <Color bind:activeVariant {reactiveActiveVariant} {variant} />
      {/each}
    </div>
  </div>
</div>
