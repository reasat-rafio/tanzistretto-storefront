<script lang="ts">
  import * as Carousel from '$components/ui/carousel/index.js';
  import type { CarouselAPI } from '$components/ui/carousel/context.js';
  import { ChevronLeftIcon, ChevronRight } from 'lucide-svelte';
  import type { GroupedFavProduct } from '$lib/types/landing.types';
  import Color from './color.svelte';

  type Variant = GroupedFavProduct['variants'][0];
  export let variants: Variant[];
  export let activeVariant: Variant | null;
  export let reactiveActiveVariant: Variant;

  let colorSliderApi: CarouselAPI;
</script>

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
