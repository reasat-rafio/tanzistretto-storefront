<script lang="ts">
  import * as Carousel from '$lib/components/ui/carousel/index.js';
  import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
  import type { GroupedFavProduct } from '$lib/types/landing.types';

  export let slug: string;
  export let name: string;
  export let reactiveActiveVariant: GroupedFavProduct['variants'][0];
  export let mediaSliderApi: CarouselAPI;
</script>

<a href="/products/{slug}">
  <Carousel.Root
    bind:api={mediaSliderApi}
    opts={{ watchDrag: false, duration: 20, loop: true }}>
    <Carousel.Content>
      {#each reactiveActiveVariant?.assets as { source } (source)}
        <Carousel.Item class="p-0">
          <img
            class="h-full w-full object-cover object-center"
            src={source}
            alt={name} />
          <span class="sr-only">{name}</span>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
  </Carousel.Root>
</a>
