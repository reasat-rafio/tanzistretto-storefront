<script lang="ts">
  import * as Carousel from '$components/ui/carousel/index.js';
  import type { CarouselAPI } from '$components/ui/carousel/context.js';
  import { ChevronLeftIcon, ChevronRight } from 'lucide-svelte';
  import Color from './color.svelte';
  import type { Variant } from '$lib/types/landing.types';

  export let activeVariant: Variant;
  export let variants: Variant[];

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
        {#each variants as variant}
          <Carousel.Item class="flex basis-auto p-1.5">
            <Color bind:activeVariant {variant} />
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
