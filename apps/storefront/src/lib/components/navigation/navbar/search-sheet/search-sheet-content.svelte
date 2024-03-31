<script lang="ts">
  import { uiStore } from '$lib/stores/ui-store';
  import { Search, X } from 'lucide-svelte';

  function closeSearchDropdown() {
    uiStore.setSearchSheetOpen(false);
  }
</script>

<div>
  <div class="mx-auto max-w-screen-lg">
    <div class="border-primary my-4 flex gap-x-3 rounded-full border px-3 py-2">
      <Search />
      <input class="flex-1 bg-transparent outline-none" type="text" />
      <button on:click={closeSearchDropdown}>
        <X />
      </button>
    </div>
  </div>
</div>
