<script lang="ts">
  import * as Carousel from '$components/ui/carousel/index.js';
  import * as SliderBlock from '$components/ui/product-slider-block/index';
  import type { Size } from '$lib/types/common.types';
  import type { CollectionProps } from '$lib/types/landing.types';
  import FavoriteItem from './favorite-item.svelte';

  export let props: CollectionProps;
  export let sizes: Size[];
  $: ({
    collection: { active, sets, slug, title },
  } = props);
</script>

{#if active}
  <SliderBlock.Root>
    <SliderBlock.Header>
      <SliderBlock.Title>{title}</SliderBlock.Title>
    </SliderBlock.Header>

    <Carousel.Root class="w-full ">
      <Carousel.Content>
        {#each sets as set (set._id)}
          <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
            <FavoriteItem {set} {sizes} />
          </Carousel.Item>
        {/each}
      </Carousel.Content>
      <Carousel.Previous class="hidden lg:flex" />
      <Carousel.Next class="hidden lg:flex" />
    </Carousel.Root>
  </SliderBlock.Root>
{/if}
