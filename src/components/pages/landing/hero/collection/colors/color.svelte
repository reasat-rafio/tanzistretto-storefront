<script lang="ts">
  import type { Variant } from '$lib/types/landing.types';
  import { scale } from 'svelte/transition';

  export let activeVariant: Variant;
  export let variant: Variant;

  $: isActive = activeVariant?._key === variant?._key;
</script>

<button
  on:click={() => {
    if (!isActive) activeVariant = variant;
  }}
  class="relative h-4 w-4 rounded-full"
  style="background-color: {variant?.color?.color?.hex};">
  {#key activeVariant?._key}
    <div
      transition:scale
      class:border={isActive}
      class="absolute inset-0 h-full w-full scale-125 rounded-full border border-gray-800">
    </div>
  {/key}
</button>
