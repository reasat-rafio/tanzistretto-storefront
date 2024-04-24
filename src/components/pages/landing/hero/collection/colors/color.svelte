<script lang="ts">
  import type { Variant } from '$lib/types/landing.types';

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
  <div
    class:border={isActive}
    style="border-color: {variant?.color?.color?.hex};"
    class="border-1 absolute inset-0 h-full w-full scale-150 rounded-full">
  </div>
</button>
