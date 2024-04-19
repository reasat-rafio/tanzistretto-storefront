<script lang="ts">
  import Navbar from '$components/navigation/navbar/navbar.svelte';
  import Promotion from '$components/promotion.svelte';
  import { Toaster } from '$components/ui/sonner';
  import { urlFor } from '$lib/sanity/sanity-client';
  import '@fontsource/metropolis/300.css';
  import '@fontsource/metropolis/400.css';
  import '@fontsource/metropolis/500.css';
  import '@fontsource/metropolis/600.css';
  import '@fontsource/metropolis/700.css';
  import '@fontsource/metropolis/800.css';
  import type { LayoutData } from './$types';
  import { authStore } from '$lib/stores/auth-store';

  export let data: LayoutData;
  $: ({
    user,
    site: {
      nav,
      promotions,
      logos: { logo, favicon },
    },
  } = data);

  $: authStore.setUser(user);

  let faviconImage = favicon
    ? urlFor(favicon).size(256, 256).ignoreImageParams().url()
    : null;
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={faviconImage} />
</svelte:head>

<Toaster richColors position="bottom-left" />
<div class="sticky inset-0 z-30">
  <Promotion {promotions} />
  <Navbar {logo} {nav} />
</div>
<slot />
