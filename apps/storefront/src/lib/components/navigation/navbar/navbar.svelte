<script lang="ts">
  import { imgBuilder } from '$lib/sanity/sanity-client';
  import SanityImage from '$lib/sanity/sanity-image/sanity-image.svelte';
  import type { SanityImageWithAlt } from '$lib/types/common.types';
  import type { Nav, SubLinks } from '$lib/types/site.types';
  import { Heart, ShoppingBag, User } from 'lucide-svelte';
  import MobileSidebar from './mobile-sidebar/mobile-sidebar.svelte';
  import SearchDropdown from './search-dropdown.svelte';
  import Search from './search.svelte';
  import NavItem from './nav-item.svelte';
  import DesktopNavItemsDropdown from './desktop-nav-items-dropdown.svelte';

  export let logo: SanityImageWithAlt;
  export let nav: Nav;

  let showSearchDropdown = false;
  let showDesktopNavItemsDropdown = false;
  let activeSubLinks: SubLinks[] | undefined = undefined;
</script>

<nav
  on:mouseleave={() => (showDesktopNavItemsDropdown = false)}
  class="sticky inset-0 z-30 w-full">
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
              <NavItem
                bind:activeSubLinks
                bind:showDesktopNavItemsDropdown
                {navItem} />
            {/each}
          </ul>
        </div>
      </div>

      <div class="flex gap-x-3 lg:gap-x-6">
        <Search bind:showSearchDropdown />
        <div class="flex gap-x-2 lg:gap-x-4">
          <button>
            <Heart class="h-[20px] w-[20px] lg:h-[24px] lg:w-[24px]" />
          </button>

          <button>
            <User />
          </button>

          <button>
            <ShoppingBag class="h-[20px] w-[20px] lg:h-[24px] lg:w-[24px]" />
          </button>

          <MobileSidebar {nav} />
        </div>
      </div>
    </div>

    {#if showSearchDropdown}
      <SearchDropdown bind:showSearchDropdown />
    {/if}

    {#if showDesktopNavItemsDropdown}
      <DesktopNavItemsDropdown
        bind:showDesktopNavItemsDropdown
        {activeSubLinks} />
    {/if}
  </div>
</nav>
