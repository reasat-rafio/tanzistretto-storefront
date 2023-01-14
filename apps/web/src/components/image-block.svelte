<script lang="ts">
  import type { SanityAsset } from "@sanity/image-url/lib/types/types";
  import SanityImage from "./sanity-image.svelte";
  export let source: SanityAsset;
  export let maxWidth: number;
  let klass: string | null = null;
  export { klass as class };
</script>

{#if source.asset}
  <figure class={klass}>
    <SanityImage class={klass} {maxWidth} image={source} />
    {#if source.caption}
      <figcaption>{source.caption}</figcaption>
    {/if}
  </figure>
{/if}
