<script lang="ts">
  import { urlFor } from '$lib/sanity/sanity-client';
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';
  import Promotion from '$lib/components/promotion.svelte';

  export let data: LayoutData;
  $: ({
    site: {
      logos: { logo, favicon },
      promotions,
    },
  } = data);

  let faviconImage = favicon
    ? urlFor(favicon).size(256, 256).ignoreImageParams().url()
    : null;

  onMount(() => {
    window.handleCredentialResponse = async (googleUser: unknown) => {
      await fetch('/auth/google', {
        method: 'POST',
        body: JSON.stringify(googleUser),
      }).catch((e) => {
        if (e) console.log(e);
      });
    };

    return () => {
      if ((window as any).handleCredentialResponse) {
        delete (window as any).handleCredentialResponse;
      }
    };
  });
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={faviconImage} />
</svelte:head>

<main class="overflow-hidden">
  <Promotion {promotions} />
  <slot />
</main>
