<script lang="ts">
  import { imgBuilder } from '$lib/sanity/sanity-client';
  import SanityImage from '$lib/sanity/sanity-image/sanity-image.svelte';
  import type { SubLinks } from '$lib/types/site.types';
  import { blur, fade } from 'svelte/transition';

  export let activeSubLinks: SubLinks[] | undefined = undefined;
</script>

<div
  transition:blur
  class="absolute bottom-0 left-0 min-h-[20dvh] w-full translate-y-full border-t bg-white shadow-lg">
  <div class="mx-auto max-w-screen-lg py-10">
    <ul class="grid grid-cols-5 gap-5">
      {#if !!activeSubLinks}
        {#each activeSubLinks as subLink (subLink._key)}
          {#key subLink}
            <li in:fade>
              {#if subLink._type === 'links'}
                <ul class="space-y-2 pt-2">
                  {#each subLink.links as { link, title }}
                    <li>
                      <a class="font-medium" href={link}>{title}</a>
                    </li>
                  {/each}
                </ul>
              {:else if subLink._type === 'poster'}
                <a class="space-y-2" href={subLink.link}>
                  <div class="aspect-square overflow-hidden rounded-2xl">
                    <SanityImage
                      lqip
                      src={subLink.image}
                      alt={subLink.title}
                      sizes="200px"
                      class="h-full w-full object-cover"
                      imageUrlBuilder={imgBuilder} />
                  </div>
                  <div>
                    <span class="block font-medium">{subLink.title}</span>
                    {#if !!subLink?.subtitle}
                      <span class="text-sm italic">{subLink.subtitle}</span>
                    {/if}
                  </div>
                </a>
              {/if}
            </li>
          {/key}
        {/each}
      {/if}
    </ul>
  </div>
</div>
