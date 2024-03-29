<script lang="ts">
  import type { GroupedFavProduct } from '$lib/types/landing.types';
  import { Heart } from 'lucide-svelte';
  import Color from './color.svelte';

  export let item: GroupedFavProduct;

  $: ({ id, name, slug, variants } = item);
  $: activeVariant = variants[0];
</script>

<div class="space-y-3 p-1">
  <div class="relative block h-[22rem] overflow-hidden rounded-2xl">
    <button
      on:click|stopPropagation={() => {}}
      class=" absolute right-5 top-5 rounded-full bg-white p-2 transition-transform duration-300 hover:scale-105">
      <Heart size={18} />
      <span class="sr-only">Add To Favorites</span>
    </button>

    <a href="/products/{slug}">
      {#key activeVariant}
        <img
          class="h-full w-full object-cover"
          src={activeVariant?.assets[0].source}
          alt={name} />
      {/key}

      <span class="sr-only">{name}</span>
    </a>
  </div>
  <div class="text-base">
    <a href="/products/{slug}" class="font-medium">{name}</a>
    <h5 class="font-semibold">৳{activeVariant?.priceWithTax}</h5>

    <div class="mt-2 flex gap-x-3">
      {#each variants as variant}
        <Color bind:activeVariant {variant} />
      {/each}
    </div>
  </div>
</div>
