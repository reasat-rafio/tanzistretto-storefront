<script lang="ts">
  import Promotion from '$lib/components/promotion.svelte';
  import { urlFor } from '$lib/sanity/sanity-client';
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';
  import Navbar from '$lib/components/navigation/navbar/navbar.svelte';
  import '@fontsource/metropolis/300.css';
  import '@fontsource/metropolis/400.css';
  import '@fontsource/metropolis/500.css';
  import '@fontsource/metropolis/600.css';
  import '@fontsource/metropolis/700.css';
  import '@fontsource/metropolis/800.css';

  export let data: LayoutData;
  $: ({
    site: {
      nav,
      promotions,
      logos: { logo, favicon },
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

<main class="">
  <div class="sticky inset-0 z-30">
    <Promotion {promotions} />
    <Navbar {logo} {nav} />
  </div>
  <slot />
</main>
