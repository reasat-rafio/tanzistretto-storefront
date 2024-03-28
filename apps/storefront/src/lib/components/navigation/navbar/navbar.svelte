<script lang="ts">
  import { imgBuilder } from '$lib/sanity/sanity-client';
  import SanityImage from '$lib/sanity/sanity-image/sanity-image.svelte';
  import type { SanityImageWithAlt } from '$lib/types/common.types';
  import type { Nav } from '$lib/types/site.types';
  import { Heart, Menu, ShoppingBag, User } from 'lucide-svelte';
  import MobileSidebar from './mobile-sidebar/mobile-sidebar.svelte';
  import SearchDropdown from './search-dropdown.svelte';
  import Search from './search.svelte';
  import * as Sheet from '$lib/components/ui/sheet';

  export let logo: SanityImageWithAlt;
  export let nav: Nav;

  let showSearchDropdown = false;
  let showMobileSidebar = false;
</script>

<nav class=" sticky inset-0 w-full">
  <div class="relative">
    <div class="container flex items-center justify-between">
      <div>
        <a class="relative lg:z-30" href="/">
          <SanityImage
            class="h-full max-h-[70px] w-fit object-contain"
            sizes="200px"
            src={logo}
            alt={logo.alt}
            imageUrlBuilder={imgBuilder} />
        </a>
        <!-- Nav items for desktop -->
        <!-- <div></div> -->
      </div>

      <div class="flex gap-x-3 md:gap-x-6">
        <Search bind:showSearchDropdown />
        <div class="flex gap-x-2 md:gap-x-4">
          <button>
            <Heart class="h-[20px] w-[20px] md:h-[24px] md:w-[24px]" />
          </button>

          <button>
            <User />
          </button>

          <button>
            <ShoppingBag class="h-[20px] w-[20px] md:h-[24px] md:w-[24px]" />
          </button>

          <MobileSidebar {nav} />
        </div>
      </div>
    </div>

    {#if showSearchDropdown}
      <SearchDropdown bind:showSearchDropdown />
    {/if}
  </div>
</nav>
