<script lang="ts">
  import Hero from '$lib/components/pages/landing/hero/hero.svelte';
  import OurFavorites from '$lib/components/pages/landing/hero/our-favorites/our-favorites.svelte';
  import Seo from '$lib/components/seo.svelte';

  export let data;
  $: ({
    products,
    page: { sections, seo },
    site: {
      logos: { ogImage },
    },
  } = data);
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as props}
  {#if props._type === 'landing.hero'}
    <Hero {props} />
  {/if}
{/each}

<!-- {#if !!favoriteCollection?.productVariants?.items?.length}
  <OurFavorites {favoriteCollection} />
{/if} -->
