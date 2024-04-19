<script lang="ts">
  import { Search } from 'lucide-svelte';
  import * as Sheet from '$components/ui/sheet';
  import SearchSheetContent from './search-sheet-content.svelte';
  import { uiStore } from '$lib/stores/ui-store';
</script>

<Sheet.Root bind:open={$uiStore.openSearchSheet}>
  <Sheet.Trigger>
    <div
      class="flex items-center gap-x-2 rounded-full bg-primary/70 px-5 py-2 text-xs text-primary-foreground md:text-sm">
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
