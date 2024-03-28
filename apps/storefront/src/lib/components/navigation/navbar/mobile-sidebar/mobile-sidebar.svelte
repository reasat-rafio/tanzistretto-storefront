<script lang="ts">
  import * as Sheet from '$lib/components/ui/sheet/index.js';
  import type { Nav } from '$lib/types/site.types';
  import { Menu } from 'lucide-svelte';
  import NavItem from './nav-item.svelte';

  export let nav: Nav;
</script>

<Sheet.Root>
  <Sheet.Trigger>
    <button class="md:hidden">
      <Menu size={30} />
    </button>
  </Sheet.Trigger>
  <Sheet.Content class=" w-full">
    <ul class="text-primary flex flex-col divide-y">
      {#each nav.menu as navItem}
        <NavItem {navItem} />
      {/each}
    </ul>
  </Sheet.Content>
</Sheet.Root>
