<script lang="ts">
  import { imgBuilder } from '$lib/sanity/sanity-client';
  import SanityImage from '$lib/sanity/sanity-image/sanity-image.svelte';
  import type { Menu } from '$lib/types/site.types';
  import { ChevronDown } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  export let navItem: Menu;
  $: ({ title, type, externalLink, internalLink, subLinks } = navItem);
  $: hasSubLinks = !!subLinks?.length;
  let open = false;
</script>

<li
  role={hasSubLinks ? 'button' : undefined}
  class="py-3"
  on:click={() => {
    if (hasSubLinks) open = !open;
  }}>
  <svelte:element
    this={hasSubLinks ? 'button' : 'a'}
    class="flex w-full items-center justify-between text-lg uppercase"
    href={type === 'internal' ? internalLink : externalLink}>
    <span>{title}</span>

    {#if hasSubLinks}
      <button
        class="{open
          ? 'rotate-180'
          : 'rotate-0'} transition-transform duration-300">
        <ChevronDown size={20} />
      </button>
    {/if}
  </svelte:element>

  {#if hasSubLinks && open && subLinks?.length}
    <ul transition:slide class="grid grid-cols-2 gap-4 px-2 md:grid-cols-4">
      {#each subLinks as subLink}
        {#if subLink._type === 'links'}
          <ul class="col-span-2 space-y-2 pt-2 sm:col-span-1">
            {#each subLink.links as { link, title }}
              <li>
                <a class="font-medium" href={link}>{title}</a>
              </li>
            {/each}
          </ul>
        {:else if subLink._type === 'poster'}
          <li>
            <a class="space-y-2" href={subLink.link}>
              <div class="aspect-square overflow-hidden rounded-2xl">
                <SanityImage
                  src={subLink.image}
                  alt={subLink.title}
                  sizes="200px"
                  class="h-full w-full object-cover"
                  imageUrlBuilder={imgBuilder} />
              </div>

              <span class="block font-medium">{subLink.title}</span>
            </a>
          </li>
        {/if}
      {/each}
    </ul>
  {/if}
</li>
