<script lang="ts">
  import * as Carousel from '$lib/components/ui/carousel/index.js';
  import * as SliderBlock from '$lib/components/ui/product-slider-block/index';
  import type { GetOurFavoritesCollectionQuery } from '$lib/generated/graphql';
  import type { NonNull } from '$lib/types/common.types';
  import type {
    GroupedFavProduct,
    OurFavProductVariantList,
  } from '$lib/types/landing.types';
  import FavoriteItem from './favorite-item.svelte';

  export let favoriteCollection: NonNull<
    GetOurFavoritesCollectionQuery['collection']
  >;
  $: ({ name, productVariants, slug } = favoriteCollection);
  $: modifiedItems = groupVariantsByProduct(productVariants);

  function sortVariantsByMarkDefault(a: any, b: any): number {
    if (a?.customFields?.markDefault && !b.customFields?.markDefault) return -1;
    if (!a.customFields?.markDefault && b.customFields?.markDefault) return 1;
    return 0;
  }

  function groupVariantsByProduct(
    variantList: OurFavProductVariantList,
  ): GroupedFavProduct[] {
    const groupedProducts: { [key: string]: GroupedFavProduct } = {};

    variantList.items.forEach((variant) => {
      const { slug, name, id, facetValues } = variant.product;
      if (!groupedProducts[slug]) {
        groupedProducts[slug] = { slug, name, id, facetValues, variants: [] };
      }
      groupedProducts[slug].variants.push(variant);
    });

    for (const key in groupedProducts) {
      if (Object.prototype.hasOwnProperty.call(groupedProducts, key)) {
        groupedProducts[key].variants.sort(sortVariantsByMarkDefault);
      }
    }

    return Object.values(groupedProducts);
  }
</script>

<SliderBlock.Root>
  <SliderBlock.Header>
    <SliderBlock.Title>{name}</SliderBlock.Title>
  </SliderBlock.Header>

  <Carousel.Root class="w-full ">
    <Carousel.Content>
      {#each modifiedItems as item (item.id)}
        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
          <FavoriteItem {item} />
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous class="hidden lg:flex" />
    <Carousel.Next class="hidden lg:flex" />
  </Carousel.Root>
</SliderBlock.Root>
