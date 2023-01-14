<script lang="ts">
  import type { PageData } from "$lib/@types/global.types";
  import type { ShopPageProps } from "$lib/@types/shop.types";
  import { setContext } from "svelte";
  import Filters from "$components/shop/filters/filters.svelte";
  import Products from "$components/shop/products.svelte";
  import SortBy from "$components/shop/sort-by.svelte";
  import { Motion } from "svelte-motion";
  import { EASE } from "$lib/helpers/constants";

  export let data: PageData<ShopPageProps>;
  const { categories, materials, products } = data?.data;

  setContext("categories", categories);
  setContext("materials", materials);
</script>

<main class="container | my-20 mx-auto relative z-10">
  <Motion
    let:motion
    initial={{ filter: "blur(40px)" }}
    animate={{ filter: "blur(0px)" }}
    transition={{ duration: 0.7, ease: EASE }}
  >
    <header use:motion>
      <h1
        class="flex flex-col | uppercase text-[80px] leading-none tracking-tighter w-fit font-title"
      >
        <span class="ml-[15%] font-extralight italic text-black">Our</span>
        <span class="font-thin">Product</span>
      </h1>
    </header>
  </Motion>
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
