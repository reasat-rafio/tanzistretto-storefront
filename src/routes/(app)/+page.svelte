<script lang="ts">
  import Hero from '$components/pages/landing/hero/hero.svelte';
  import Collection from '$components/pages/landing/hero/collection/collection.svelte';
  import Seo from '$components/seo.svelte';

  export let data;
  $: ({
    page: { sections, seo, sizes },
    site: {
      logos: { ogImage },
    },
  } = data);
</script>

<Seo {seo} siteOgImg={ogImage} />
{#each sections as props}
  {#if props._type === 'landing.hero'}
    <Hero {props} />
  {:else if props._type === 'landing.collection' && props.collection?.active && !!props?.collection?.sets.length}
    <Collection {props} {sizes} />
  {/if}
{/each}
