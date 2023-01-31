<script lang="ts">
  import type { PageData } from "$lib/@types/global.types";
  import { renderObjectArray } from "$lib/helpers/render-array-obj";
  import Hero from "$components/home/hero/hero.svelte";

  export let data: PageData<any>;
  const { page } = data;

  const components = renderObjectArray(page.sections, {
    "homePage.hero": Hero,
  });
</script>

<div>
  {#if !!components?.length}
    {#each components as { component, props }}
      <svelte:component this={component} {props} />
    {/each}
  {/if}
</div>
