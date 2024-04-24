<script lang="ts">
  import Hero from '$components/pages/landing/hero/hero.svelte';
  import OurFavorites from '$components/pages/landing/hero/our-favorites/our-favorites.svelte';
  import Seo from '$components/seo.svelte';

  export let data;
  $: ({
    page: { sections, seo },
    site: {
      logos: { ogImage },
    },
  } = data);

  $: {
    console.log(sections);
  }
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
