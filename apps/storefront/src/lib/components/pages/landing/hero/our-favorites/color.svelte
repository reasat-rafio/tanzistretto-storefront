<script lang="ts">
  import type { GroupedFavProduct } from '$lib/types/landing.types';

  type Variant = GroupedFavProduct['variants'][0];

  export let activeVariant: Variant;
  export let variant: Variant;

  $: color = variant.facetValues.find((facet) => facet.facet.name === 'Color');
</script>

<button
  on:click={() => (activeVariant = variant)}
  class="relative h-4 w-4 rounded-full"
  style="background-color: {color?.code};">
  <div
    style="border-color: {color?.code};"
    class="absolute inset-0 h-full w-full scale-125 rounded-full border">
  </div>
</button>
