<script lang="ts">
  import type { PageData } from "./$types";
  import Navbar from "./components/navbar/navbar.svelte";
  import { navbarHeight } from "$lib/stores/global.store";
  import CartSidebar from "./components/cart-sidebar/cart-sidebar.svelte";
  import SearchDropdown from "./components/search-dropdown/search-dropdown.svelte";

  export let data: PageData;
  const site = data.site;
</script>

<Navbar {site} />
<CartSidebar />
<SearchDropdown />
<main style="padding-top: {$navbarHeight}px;">
  <slot />
</main>
