<script lang="ts">
  import type { GroupedFavProduct } from '$lib/types/landing.types';

  type Variant = GroupedFavProduct['variants'][0];

  export let activeVariant: Variant | null;
  export let reactiveActiveVariant: Variant;
  export let variant: Variant;

  $: color = variant.facetValues.find(({ facet }) => facet.name === 'Color');

  $: isActive = reactiveActiveVariant?.id === variant?.id;
</script>

<button
  on:click={() => {
    if (!isActive) activeVariant = variant;
  }}
  class="relative h-4 w-4 rounded-full"
  style="background-color: {color?.code};">
  <div
    class:border={isActive}
    style="border-color: {color?.code};"
    class="absolute inset-0 h-full w-full scale-150 rounded-full">
  </div>
</button>
