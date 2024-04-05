<script lang="ts">
  import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
  import type { GroupedFavProduct } from '$lib/types/landing.types';
  import MakeFavoriteWidget from './make-favorite-widget.svelte';
  import Controls from './controls.svelte';
  import Media from './media.svelte';
  import SelectSizeWidget from './select-size-widget.svelte';
  import Colors from './colors/colors.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Badge } from '$lib/components/ui/badge/index.js';

  export let item: GroupedFavProduct;

  // TODO do clear definition of reactiveActiveVariant and activeVariant
  let mediaSliderApi: CarouselAPI;
  let activeVariant: GroupedFavProduct['variants'][0] | null = null;
  $: ({ name, slug, variants, facetValues, customFields } = item);
  $: reactiveActiveVariant = activeVariant ?? variants[0];
  $: productParentSizes = facetValues.filter(
    ({ facet }) => facet.name === 'Size',
  );

  $: activeVariantSizes = reactiveActiveVariant.facetValues.filter(
    ({ facet }) => facet.name === 'Size',
  );

  $: sizes = !!activeVariantSizes?.length
    ? activeVariantSizes
    : productParentSizes;

  // function addItemTOBag(size: (typeof sizes)[0]) {
  //   //
  // }
</script>

<div class="group space-y-3 p-1">
  <div class="bg-muted relative block h-[22rem] overflow-hidden rounded-3xl">
    {#if customFields?.displayNewTag}
      <Badge variant="default" class="absolute left-5 top-5 z-10">NEW</Badge>
    {/if}
    <MakeFavoriteWidget />
    <Media bind:mediaSliderApi {name} {slug} {reactiveActiveVariant} />
    <SelectSizeWidget activeVariantId={reactiveActiveVariant.id} {sizes} />
    {#if reactiveActiveVariant?.assets?.length > 1}
      <Controls {mediaSliderApi} />
    {/if}
  </div>
  <div class="text-base">
    <a href="/products/{slug}" class="mb-2 font-medium">{name}</a>
    <h5 class="font-semibold">৳{reactiveActiveVariant?.priceWithTax}</h5>
    <Colors bind:activeVariant {variants} {reactiveActiveVariant} />
  </div>
</div>
