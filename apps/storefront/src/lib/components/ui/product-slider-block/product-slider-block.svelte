<script lang="ts">
  import { cn } from '$lib/utils/helpers';
  import type { HTMLAttributes } from 'svelte/elements';

  type $$Props = HTMLAttributes<HTMLElement>;
  let className: $$Props['class'] = undefined;
</script>

<section class={cn('container space-y-[1.81rem] py-6', className)}>
  <slot />
</section>
