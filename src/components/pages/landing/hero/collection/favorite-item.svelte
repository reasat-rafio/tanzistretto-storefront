<script lang="ts">
  import type { CarouselAPI } from '$components/ui/carousel/context.js';
  import MakeFavoriteWidget from './make-favorite-widget.svelte';
  import Controls from './controls.svelte';
  import Media from './media.svelte';
  import SelectSizeWidget from './select-size-widget.svelte';
  import Colors from './colors/colors.svelte';
  import { Badge } from '$components/ui/badge/index.js';
  import type { Set, Variant } from '$lib/types/landing.types';
  import { onMount } from 'svelte';
  import type { Size } from '$lib/types/common.types';

  export let set: Set;
  export let sizes: Size[];

  $: ({ outOfStock, price, slug, title, variants, isNew } = set);

  let mediaSliderApi: CarouselAPI;
  let activeVariant: Variant;

  onMount(() => {
    activeVariant = variants[0];
  });

  $: {
    console.log({ activeVariant });
  }
  function addItemTOBag() {}
</script>

<div class="group space-y-3 p-1">
  <div class="relative block overflow-hidden rounded-3xl bg-muted">
    {#if isNew}
      <Badge variant="secondary" class="absolute left-5 top-5 z-10">NEW</Badge>
    {/if}
    <MakeFavoriteWidget />
    <Media bind:mediaSliderApi {title} {slug} {activeVariant} />
    {#if activeVariant?._key}
      <SelectSizeWidget activeVariantId={activeVariant._key} {sizes} />
    {/if}
    {#if !!activeVariant?.images?.length && activeVariant?.images?.length > 1}
      <Controls {mediaSliderApi} />
    {/if}
  </div>
  <div class="text-base">
    <a href="/products/{slug}" class="mb-2 font-medium">{title}</a>
    <h5 class="font-semibold">৳{price}</h5>
    <Colors bind:activeVariant {variants} />
  </div>
</div>
