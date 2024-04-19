<script lang="ts">
  import MegaMenu from '$components/navigation/mega-menu.svelte';
  import BagSheet from '$components/sheets/bag-sheet/bag-sidebar.svelte';
  import MobileSheet from '$components/sheets/mobile-sheet/mobile-sheet.svelte';
  import SearchSheet from '$components/sheets/search-sheet/search-sheet.svelte';
  import UserSheet from '$components/sheets/user-sheet/user-sheet.svelte';
  import { imgBuilder } from '$lib/sanity/sanity-client';
  import SanityImage from '$lib/sanity/sanity-image/sanity-image.svelte';
  import type { SanityImageWithAlt } from '$lib/types/common.types';
  import type { Nav, SubLinks } from '$lib/types/site.types';
  import { Heart } from 'lucide-svelte';
  import NavItem from './nav-item.svelte';

  export let logo: SanityImageWithAlt;
  export let nav: Nav;

  let showMegaMenu = false;
  let activeSubLinks: SubLinks[] | undefined = undefined;
</script>

<nav on:mouseleave={() => (showMegaMenu = false)} class="z-30 w-full bg-white">
  <div class="relative">
    <div class="container flex items-center justify-between">
      <div class="flex items-center gap-x-10">
        <a class="relative lg:z-30" href="/">
          <SanityImage
            class="h-full max-h-[70px] w-fit object-contain"
            sizes="200px"
            src={logo}
            alt={logo.alt}
            imageUrlBuilder={imgBuilder} />
        </a>

        <div class="hidden lg:block">
          <ul class="flex gap-x-5">
            {#each nav.menu as navItem}
              <NavItem bind:activeSubLinks bind:showMegaMenu {navItem} />
            {/each}
          </ul>
        </div>
      </div>

      <div class="flex gap-x-3 lg:gap-x-6">
        <SearchSheet />
        <div class="flex gap-x-2 lg:gap-x-4">
          <button>
            <Heart />
          </button>
          <UserSheet />
          <BagSheet />
          <MobileSheet {nav} />
        </div>
      </div>
    </div>

    {#if showMegaMenu}
      <MegaMenu {activeSubLinks} />
    {/if}
  </div>
</nav>
