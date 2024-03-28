<script lang="ts">
  import type { Promotion } from '$lib/types/site.types';
  import { PortableText } from '@portabletext/svelte';
  import { onMount } from 'svelte';

  export let promotions: Promotion[];

  let hide = false;
  let activeIndex = 0;
  let interval: NodeJS.Timeout;

  onMount(() => {
    interval = setInterval(() => {
      activeIndex = (activeIndex + 1) % promotions.length;
    }, 3500);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div>
  <div
    class="bg-primary text-primary-foreground container py-1 text-center text-sm">
    <PortableText components={{}} value={promotions[activeIndex].title} />
  </div>
</div>
