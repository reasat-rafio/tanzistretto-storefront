<script lang="ts">
  import type { Promotion } from '$lib/types/site.types';
  import { PortableText } from '@portabletext/svelte';
  import { X } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';

  export let promotions: Promotion[];

  let hide = false;
  let activeIndex = 0;
  let interval: NodeJS.Timeout;

  onMount(() => {
    interval = setInterval(() => {
      activeIndex = (activeIndex + 1) % promotions.length;
    }, 3500);

    return () => clearInterval(interval);
  });
</script>

{#if !hide}
  <div transition:slide>
    <div
      class="bg-primary text-primary-foreground text-xxs relative py-2 text-center text-xs font-medium md:text-xs">
      {#key promotions[activeIndex].title}
        <div class="container" in:fade>
          <PortableText components={{}} value={promotions[activeIndex].title} />
        </div>
      {/key}

      <button
        on:click={() => (hide = true)}
        class="absolute right-2 top-1/2 -translate-y-1/2">
        <X size={18} color="white" />
      </button>
    </div>
  </div>
{/if}
