<script lang="ts">
  import Filters from "./components/filters/filters.svelte";
  import Products from "./components/products.svelte";
  import SortBy from "./components/sort-by.svelte";

  export let data;
  //   let { data } = data.data;
  console.log(data);
</script>

<main class="container mx-auto">
  <header>
    <h1 class="flex flex-col | text-7xl | uppercase">
      <span class="ml-10 | font-light text-black">Our</span>
      <span class="font-title font-thin ">Product</span>
    </h1>
  </header>
  <div class="grid grid-cols-12">
    <section class="col-span-2">
      <Filters />
    </section>
    <section class="col-span-8">
      <SortBy />
      <Products />
    </section>
  </div>
</main>
