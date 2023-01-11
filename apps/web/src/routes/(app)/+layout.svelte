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

<CartSidebar />
<Motion
  let:motion
  initial={{ x: 0, filter: "blur(0px)" }}
  animate={{
    x: $showCart ? -100 : 0,
    filter: $showCart ? "blur(8px)" : "blur(0px)",
  }}
  transition={{ ease: EASE, duration: 0.65 }}
>
  <div
    class={$showCart ? "pointer-events-none" : "pointer-events-auto"}
    use:motion
  >
    <Navbar {site} />
    <main style="padding-top: {$navbarHeight}px;">
      <slot />
    </main>
  </div>
</Motion>
