<script lang="ts">
  import { clickOutside } from '$lib/actions/click-outside';
  import { Search, X } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  export let showSearchDropdown = false;

  function closeSearchDropdown() {
    showSearchDropdown = false;
  }
</script>

<div
  transition:slide
  use:clickOutside
  on:clickOutside={closeSearchDropdown}
  class="absolute left-0 top-0 max-h-[calc(100dvh-75px)] w-full bg-white px-3 shadow">
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
