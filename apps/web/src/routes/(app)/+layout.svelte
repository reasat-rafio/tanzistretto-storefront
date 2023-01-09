<script lang="ts">
  import type { Site } from "$lib/@types/globa.types";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import Navbar from "./components/navbar/navbar.svelte";

  export let data: PageData;
  const site = data.site;
  let navbarHeight: number;
</script>

<Navbar bind:clientHeight={navbarHeight} {site} />
<main style="padding-top: {navbarHeight ?? 88}px;">
  <slot />
</main>
