<script lang="ts">
  import type { Site } from "$lib/@types/global.types";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import Navbar from "./components/navbar/navbar.svelte";
  import { navbarHeight } from "$lib/stores/global.store";
  import CartSidebar from "./components/cart-sidebar/cart-sidebar.svelte";

  export let data: PageData;
  const site = data.site;
</script>

<Navbar {site} />
<CartSidebar />
<main style="padding-top: {$navbarHeight}px;">
  <slot />
</main>
