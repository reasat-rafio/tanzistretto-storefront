<script lang="ts">
  import type { Site } from "$lib/@types/globa.types";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import Navbar from "./components/navbar/navbar.svelte";
  import { navbarHeight } from "$lib/stores/global.store";

  export let data: PageData;
  const site = data.site;
</script>

<Navbar {site} />
<main style="padding-top: {$navbarHeight}px;">
  <slot />
</main>
