<script lang="ts">
  import { Search } from 'lucide-svelte';

  export let showSearchDropdown: boolean;
</script>

<button
  on:click={() => (showSearchDropdown = !showSearchDropdown)}
  class="bg-primary/70 text-primary-foreground flex items-center gap-x-2 rounded-full px-5 py-2 text-xs md:text-sm">
  <Search class="h-[16px] w-[16px] md:h-[18px] md:w-[18px]" />
  <span class="">search</span>
</button>
