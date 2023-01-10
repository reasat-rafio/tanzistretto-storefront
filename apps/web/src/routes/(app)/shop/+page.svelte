<script lang="ts">
  import type { PageData } from "$lib/@types/globa.types";
  import type { ShopPageProps } from "$lib/@types/shop.types";
  import { setContext } from "svelte";
  import Filters from "./components/filters/filters.svelte";
  import Products from "./components/products.svelte";
  import SortBy from "./components/sort-by.svelte";

  export let data: PageData<ShopPageProps>;
  const { categories, materials, products } = data.data;

  setContext("categories", categories);
  setContext("materials", materials);
</script>

<main class="container | my-20 mx-auto relative z-10">
  <header>
    <h1
      class="flex flex-col | uppercase text-[80px] leading-none tracking-tighter w-fit font-title"
    >
      <span class="ml-[15%] font-extralight italic text-black">Our</span>
      <span class="font-thin">Product</span>
    </h1>
  </header>
  <div class="grid grid-cols-12 gap-x-5 mt-20">
    <section class="col-span-3">
      <Filters />
    </section>
    <section class="col-span-9 px-10">
      <SortBy />
      <Products {products} />
    </section>
  </div>
</main>
