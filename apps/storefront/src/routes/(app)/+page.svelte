<script lang="ts">
  import Hero from '$lib/components/pages/landing/hero/hero.svelte';
  import Seo from '$lib/components/seo.svelte';

  export let data;
  $: ({
    page: { sections, seo },
    favoriteCollection,
    site: {
      logos: { ogImage },
    },
  } = data);

  $: {
    console.log('====================================');
    console.log(favoriteCollection);
    console.log('====================================');
  }
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as props}
  {#if props._type === 'landing.hero'}
    <Hero {props} />
  {/if}
{/each}
