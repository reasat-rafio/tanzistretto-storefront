<script lang="ts">
  import { onMount } from "svelte";
  import { urlFor } from "$lib/sanity-client";
  import type { SanityAsset } from "@sanity/image-url/lib/types/types";

  export let image: SanityAsset;
  export let maxWidth = 1200;
  export let alt: string | undefined = undefined;

  $: dimensions = image?.asset?._ref?.split("-")[2];
  $: [width, height] = dimensions.split("x").map(Number);
  $: aspectRatio = width / height;

  let imageRef: HTMLImageElement;
  let loaded = false;

  onMount(() => {
    imageRef.onload = () => {
      loaded = true;
    };
  });

  const src: any = urlFor(image).width(maxWidth).fit("fillmax");
</script>

{#if image}
  <img
    loading="lazy"
    {src}
    alt={alt || image.alt || ""}
    class:loaded
    class={$$props.class}
    bind:this={imageRef}
    style="aspect-ratio: {aspectRatio};"
  />
{/if}
