<script lang="ts">
  import type { PageData } from "./$types";
  import Navbar from "./components/navbar/navbar.svelte";
  import { navbarHeight, showCart } from "$lib/stores/global.store";
  import CartSidebar from "./components/cart-sidebar/cart-sidebar.svelte";
  import { Motion } from "svelte-motion";
  import { EASE } from "$lib/helpers/constants";

  export let data: PageData;
  const site = data.site;
</script>

<Navbar {site} />
<CartSidebar />
<main style="padding-top: {$navbarHeight}px;">
  <slot />
</main>
