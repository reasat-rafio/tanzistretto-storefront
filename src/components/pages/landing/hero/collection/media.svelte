<script lang="ts">
  import * as Carousel from '$components/ui/carousel/index.js';
  import type { CarouselAPI } from '$components/ui/carousel/context.js';
  import type { Slug } from 'sanity';
  import type { Variant } from '$lib/types/landing.types';
  import SanityImage from '$lib/sanity/sanity-image/sanity-image.svelte';
  import { imgBuilder } from '$lib/sanity/sanity-client';

  export let slug: Slug;
  export let title: string;
  export let activeVariant: Variant;
  export let mediaSliderApi: CarouselAPI;
</script>

<a class="w-full" href="/products/{slug.current}">
  <Carousel.Root
    bind:api={mediaSliderApi}
    opts={{ watchDrag: false, duration: 20, loop: true }}
    plugins={[]}>
    <Carousel.Content class="h-[22rem]">
      {#if !!activeVariant?.images?.length}
        {#each activeVariant.images as image (image)}
          <Carousel.Item class="p-0">
            {#if !!image?.asset}
              <SanityImage
                class="h-full w-full object-cover object-center"
                imageUrlBuilder={imgBuilder}
                src={image}
                alt={title}
                sizes="(min-width: 1024px) 25vw, 40vw" />
              <span class="sr-only">{title}</span>
            {/if}
          </Carousel.Item>
        {/each}
      {/if}
    </Carousel.Content>
  </Carousel.Root>
</a>
