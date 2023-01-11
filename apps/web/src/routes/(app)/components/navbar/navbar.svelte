<script lang="ts">
  import type { Site } from "$lib/@types/global.types";
  import SanityImage from "$lib/components/sanity-image.svelte";
  // TODO remove this data file and this import
  import { secondaryNavData } from "./data";
  import { Motion } from "svelte-motion";
  import { NavbarVariants } from "$lib/animations/navbar";
  import { navbarHeight } from "$lib/stores/global.store";
  import SearchIcon from "$lib/components/icons/search-icon.svelte";
  import UserIcon from "$lib/components/icons/user-icon.svelte";
  import CartIcon from "$lib/components/icons/cart-icon.svelte";
  import { showCart, showQuickSearchDropdown } from "$lib/stores/global.store";
  import { cart } from "$lib/stores/cart.store";
  import AnimatePresence from "svelte-motion/src/components/AnimatePresence/AnimatePresence.svelte";

  export let site: Site;
  const {
    logos: { logo },
    nav: { menu },
  } = site;
  let scrollY: number;
  $: scrolled = scrollY > 300;
  const showCartAction = () => ($showCart = true);
  const showQuickSearchAction = () => ($showQuickSearchDropdown = true);
</script>

<Motion
  let:motion
  initial="initial"
  animate={scrolled ? "animate" : "initial"}
  variants={NavbarVariants}
>
  <nav
    bind:clientHeight={$navbarHeight}
    use:motion
    id="navbar"
    class="fixed top-0 left-0 w-screen z-30"
  >
    <div class="container | flex | mx-auto">
      <div class=" | flex justify-center items-center">
        <a href="/">
          <figure>
            <SanityImage
              class="max-h-16 object-contain h-full w-full"
              maxWidth={50}
              image={logo}
            />
            {#if logo.caption}
              <figcaption>{logo.caption}</figcaption>
            {/if}
          </figure>
        </a>
      </div>

      <ul class="flex-1 navitems_container justify-center">
        {#each menu as { _key, title, pageUrl } (_key)}
          <li class="navitem">
            <a href={pageUrl}>
              {title}
            </a>
          </li>
        {/each}
      </ul>

      <div class="navitems_container justify-end">
        <button
          on:click|stopPropagation={showQuickSearchAction}
          class="navitem"
        >
          <SearchIcon class="t-6 w-6 cursor-pointer" />
        </button>
        <button class="navitem">
          <UserIcon class="h-6 w-6 cursor-pointer" />
        </button>
        <button
          on:click|stopPropagation={showCartAction}
          class="navitem relative"
        >
          <CartIcon class="h-6 w-6 cursor-pointer" />
          <AnimatePresence show={!!$cart.length}>
            <Motion
              let:motion
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                use:motion
                class="avatar placeholder absolute top-0 translate-y-1/2 -right-3 font-body leading-none tracking-tighter"
              >
                <div
                  class="bg-neutral-focus text-neutral-content rounded-full w-5"
                >
                  <span class="text-xs">{$cart.length}</span>
                </div>
              </div>
            </Motion>
          </AnimatePresence>
        </button>
      </div>
    </div>
  </nav>
</Motion>

<svelte:window bind:scrollY />

<style lang="postcss">
  .navitems_container {
    @apply flex space-x-5;
  }

  .navitem {
    @apply text-lg  font-title uppercase text-primary flex justify-center items-center;
  }
</style>
