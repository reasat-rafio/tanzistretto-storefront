<script lang="ts">
  import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
  import { urlFor } from '$lib/sanity/sanity-client';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
  $: ({
    site: {
      logos: { logo, favicon },
    },
  } = data);

  let faviconImage = favicon
    ? urlFor(favicon).size(256, 256).ignoreImageParams().url()
    : null;
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={faviconImage} />
  <!-- <script src="https://apis.google.com/js/platform.js" async defer></script>
  <meta name="google-signin-client_id" content={PUBLIC_GOOGLE_CLIENT_ID} /> -->
</svelte:head>

<main class="overflow-hidden">
  <slot />
</main>
