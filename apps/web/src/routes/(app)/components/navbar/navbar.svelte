<script lang="ts">
  import type { Site } from "$lib/@types/globa.types";
  import SanityImage from "$lib/components/sanity-image.svelte";
  import { secondaryNavData } from "./data";
  import { Motion } from "svelte-motion";
  import { NavbarVariants } from "$lib/animations/navbar";
  import { navbarHeight } from "$lib/stores/global.store";

  export let site: Site;

  const {
    logos: { logo },
    nav: { menu },
  } = site;
  let scrollY: number;

  $: scrolled = scrollY > 300;
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
    class="fixed top-0 left-0 w-screen z-40"
  >
    <div class="container | grid grid-cols-3 | mx-auto">
      <ul class="navitems_container justify-start">
        {#each menu as { _key, title, pageUrl } (_key)}
          <li class="navitem">
            <a href={pageUrl}>
              {title}
            </a>
          </li>
        {/each}
      </ul>
      <div class="flex justify-center items-center">
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
      <ul class="navitems_container justify-end">
        {#each secondaryNavData as { _id, title, url } (_id)}
          <li class="navitem">
            <a href={url}>{title}</a>
          </li>
        {/each}
      </ul>
    </div>
  </nav>
</Motion>

<svelte:window bind:scrollY />

<style lang="postcss">
  .navbar_scroll {
    @apply bg-white/40 backdrop-blur-lg;
  }
  .navbar_static {
    @apply bg-transparent;
  }

  .navitems_container {
    @apply flex space-x-5;
  }

  .navitem {
    @apply text-sm uppercase text-cinereous flex justify-center items-center;
  }
</style>
