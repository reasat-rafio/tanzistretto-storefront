<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import type { CarouselAPI } from '$components/ui/carousel/context.js';

  export let mediaSliderApi: CarouselAPI;
</script>

<button
  on:click={() => mediaSliderApi?.scrollPrev()}
  class="absolute left-4 top-1/2 z-20 -translate-y-1/2 p-0.5 text-white transition-[transform,opacity] duration-300 will-change-transform hover:scale-110 group-hover:opacity-100 lg:opacity-0">
  <ChevronLeft size={30} />
</button>

<button
  on:click={() => mediaSliderApi?.scrollNext()}
  class="absolute right-4 top-1/2 z-20 -translate-y-1/2 p-0.5 text-white transition-[transform,opacity] duration-300 will-change-transform hover:scale-110 group-hover:opacity-100 lg:opacity-0">
  <ChevronRight size={30} />
</button>
