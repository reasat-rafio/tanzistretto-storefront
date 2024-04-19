<script lang="ts">
  import { cn } from '$lib/utils/helpers';
  import type { HTMLAttributes } from 'svelte/elements';

  type $$Props = HTMLAttributes<HTMLElement>;
  let className: $$Props['class'] = undefined;
</script>

<header class={cn('space-y-[0.25rem]', className)}>
  <slot />
</header>
