<script lang="ts">
  import * as Sheet from '$lib/components/ui/sheet/index.js';
  import type { Nav } from '$lib/types/site.types';
  import { Menu } from 'lucide-svelte';
  import NavItem from './nav-item.svelte';
  import { uiStore } from '$lib/stores/ui-store';

  export let nav: Nav;
</script>

<Sheet.Root bind:open={$uiStore.openMobileSheet}>
  <Sheet.Trigger class="p-0 lg:hidden">
    <Menu size={30} />
  </Sheet.Trigger>
  <Sheet.Content class="w-full overflow-auto">
    <ul class="text-primary flex flex-col divide-y">
      {#each nav.menu as navItem}
        <NavItem {navItem} />
      {/each}
    </ul>
  </Sheet.Content>
</Sheet.Root>
