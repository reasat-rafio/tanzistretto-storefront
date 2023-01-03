<script lang="ts">
  import type { SanityAsset } from "@sanity/image-url/lib/types/types";
  import SanityImage from "./sanity-image.svelte";
  export let source: SanityAsset;
</script>

{#if source.asset}
  <figure>
    <SanityImage image={source} />
    {#if source.caption}
      <figcaption>{source.caption}</figcaption>
    {/if}
  </figure>
{/if}
