<script lang="ts">
  import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
  import * as Carousel from '$lib/components/ui/carousel/index.js';
  import type { GroupedFavProduct } from '$lib/types/landing.types';
  import Color from './color.svelte';
  import MakeFavoriteWidget from './make-favorite-widget.svelte';
  import Controls from './controls.svelte';
  import Media from './media.svelte';
  import SelectSizeWidget from './select-size-widget.svelte';
  import { ChevronLeftIcon, ChevronRight } from 'lucide-svelte';

  export let item: GroupedFavProduct;

  // TODO do clear definition of reactiveActiveVariant and activeVariant
  let isHovered = false;
  let mediaSliderApi: CarouselAPI;
  let colorSliderApi: CarouselAPI;
  let activeVariant: GroupedFavProduct['variants'][0] | null = null;
  $: ({ name, slug, variants, facetValues } = item);
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
</script>

<div
  role="button"
  tabindex="0"
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
  class="group space-y-3 p-1">
  <div class="bg-muted relative block h-[22rem] overflow-hidden rounded-3xl">
    <MakeFavoriteWidget />
    <Media bind:mediaSliderApi {name} {slug} {reactiveActiveVariant} />
    <SelectSizeWidget {sizes} />
    {#if reactiveActiveVariant?.assets?.length > 1}
      <Controls {mediaSliderApi} />
    {/if}
  </div>
  <div class="text-base">
    <a href="/products/{slug}" class="mb-2 font-medium">{name}</a>
    <h5 class="font-semibold">৳{reactiveActiveVariant?.priceWithTax}</h5>

    <div class="flex">
      {#if colorSliderApi?.canScrollPrev()}
        <button on:click={() => colorSliderApi.scrollPrev()}>
          <ChevronLeftIcon size={14} />
        </button>
      {/if}
      <div class="flex-1">
        <Carousel.Root bind:api={colorSliderApi} opts={{ watchDrag: false }}>
          <Carousel.Content class="-ml-0 ">
            {#each variants as variant (variant.id)}
              <Carousel.Item class="flex basis-auto p-1.5">
                <Color bind:activeVariant {reactiveActiveVariant} {variant} />
              </Carousel.Item>
            {/each}
          </Carousel.Content>
        </Carousel.Root>
      </div>
      {#if colorSliderApi?.canScrollNext()}
        <button on:click={() => colorSliderApi.scrollNext()}>
          <ChevronRight size={14} />
        </button>
      {/if}
    </div>
  </div>
</div>
