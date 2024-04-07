<script lang="ts">
  import { Search } from 'lucide-svelte';
  import * as Sheet from '$lib/components/ui/sheet';
  import SearchSheetContent from './search-sheet-content.svelte';
  import { uiStore } from '$lib/stores/ui-store';
</script>

<Sheet.Root bind:open={$uiStore.openSearchSheet}>
  <Sheet.Trigger>
    <div
      class="bg-primary/70 text-primary-foreground flex items-center gap-x-2 rounded-full px-5 py-2 text-xs md:text-sm">
      <Search class="h-[16px] w-[16px] md:h-[18px] md:w-[18px]" />
      <span class="">search</span>
    </div>
  </Sheet.Trigger>
  <Sheet.Content side="top">
    <div class="container">
      <Sheet.Header>
        <Sheet.Title>Yo?</Sheet.Title>
      </Sheet.Header>

      <SearchSheetContent />
    </div>
  </Sheet.Content>
</Sheet.Root>
