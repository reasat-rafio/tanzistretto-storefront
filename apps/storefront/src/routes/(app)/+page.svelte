<script lang="ts">
  import Hero from '$lib/components/pages/landing/hero/hero.svelte';

  export let data;
  $: ({ page } = data);
</script>

{#each page.sections as props}
  {#if props._type === 'landing.hero'}
    <Hero {props} />
  {/if}
{/each}
