<script lang="ts">
  import type { Site } from "$lib/@types/globa.types";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import Navbar from "./components/navbar/navbar.svelte";

  export let data: PageData;
  const site = data.site;
  $: navbarHeight = 0;

  onMount(() => {
    navbarHeight = document.getElementById("navbar")?.clientHeight ?? 0;
  });
</script>

<Navbar {site} />
<main style="margin-top: {navbarHeight}px;">
  <slot />
</main>
