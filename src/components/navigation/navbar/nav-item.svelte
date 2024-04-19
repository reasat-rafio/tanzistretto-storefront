<script lang="ts">
  import type { Menu, SubLinks } from '$lib/types/site.types';
  import { ChevronDown } from 'lucide-svelte';

  export let navItem: Menu;
  export let showMegaMenu: boolean;
  export let activeSubLinks: SubLinks[] | undefined;

  $: ({ title, type, externalLink, internalLink, subLinks } = navItem);
  $: hasSubLinks = !!subLinks?.length;
  let open = false;

  function handleMouseEnter() {
    if (hasSubLinks) {
      showMegaMenu = true;
      activeSubLinks = subLinks;
    } else {
      showMegaMenu = false;
    }
  }
</script>

<li>
  <svelte:element
    this={hasSubLinks ? 'button' : 'a'}
    role={hasSubLinks ? 'button' : undefined}
    on:mouseenter={handleMouseEnter}
    class="flex h-full w-full items-center justify-between space-x-2 border-b-2 border-b-transparent py-5 text-lg uppercase transition-[border] duration-300 hover:border-primary"
    href={type === 'internal' ? internalLink : externalLink}>
    <span>{title}</span>

    {#if hasSubLinks}
      <button
        class="{open
          ? 'rotate-180'
          : 'rotate-0'} transition-transform duration-300">
        <ChevronDown />
      </button>
    {/if}
  </svelte:element>
</li>
