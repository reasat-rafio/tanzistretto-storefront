<script lang="ts">
  import { browser } from '$app/environment';
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

  $: if (browser)
    window.handleCredentialResponse = async (googleUser: unknown) => {
      console.log('====================================');
      console.log('HERE', googleUser);
      console.log('====================================');

      await fetch('/auth/google', {
        method: 'POST',
        body: JSON.stringify(googleUser),
      }).catch((e) => {
        if (e) console.log(e);
      });
    };
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={faviconImage} />
  <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<main class="overflow-hidden">
  <slot />
</main>
