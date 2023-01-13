<script lang="ts">
  import type { PageData } from "./$types";
  import { navbarHeight } from "$lib/stores/global.store";
  import BillingDetails from "./components/billing-details.svelte";
  import YourOrder from "./components/your-order.svelte";

  export let data: PageData;
</script>

<main
  style="min-height: calc(100vh - {$navbarHeight}px);"
  class="container mx-auto pt-20"
>
  <section>
    <header>
      <h1 class="flex flex-col | text-7xl | uppercase">
        <span class="ml-10 | font-light text-black">Order</span>
        <span class="font-title font-thin ">Checkout</span>
      </h1>
    </header>
  </section>

  <section class="grid grid-cols-12 | mt-20 gap-x-10">
    <BillingDetails class="col-span-7" />
    <YourOrder class="col-span-5" />
  </section>
</main>
