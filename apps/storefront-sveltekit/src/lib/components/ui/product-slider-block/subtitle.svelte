<script lang="ts">
  import { cn } from '$lib/utils/helpers';
  import type { HTMLAttributes } from 'svelte/elements';

  type HeaderElement = 'h2' | 'h3' | 'h4';
  type $$Props = HTMLAttributes<HTMLElement> & {
    el: HeaderElement;
  };

  export let el: HeaderElement = 'h3';
  let className: $$Props['class'] = undefined;
</script>

<svelte:element this={el} class={cn('text-sm lg:text-lg', className)}>
  <slot />
</svelte:element>
