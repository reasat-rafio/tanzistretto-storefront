<script lang="ts">
  import type { Variant } from '$lib/types/landing.types';
  import { cn } from '$lib/utils/helpers';

  export let activeVariant: Variant;
  export let variant: Variant;

  $: isActive = activeVariant?._key === variant?._key;
</script>

<button
  on:click={() => {
    if (!isActive) activeVariant = variant;
  }}
  class={cn('relative h-4 w-4 rounded-full transition-all duration-300', {
    'ring-2 ring-primary/50': isActive,
  })}
  style="background-color: {variant?.color?.color?.hex};">
</button>
