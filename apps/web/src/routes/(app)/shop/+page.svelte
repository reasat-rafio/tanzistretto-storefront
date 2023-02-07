<script lang="ts">
  import type { PageData } from "$lib/@types/global.types";
  import type { ShopPageProps } from "$lib/@types/shop.types";
  import { setContext } from "svelte";
  import Filters from "$components/shop/filters/filters.svelte";
  import SortBy from "$components/shop/sort-by.svelte";
  import Title from "$components/ui/title.svelte";
  import Product from "$components/shop/product.svelte";

  export let data: PageData<ShopPageProps>;
  const { categories, materials, products } = data?.data;

  setContext("categories", categories);
  setContext("materials", materials);
</script>

<main class="container | my-20 mx-auto relative z-10">
  <Title texts={["Our", "Products"]} />

  <div class="grid grid-cols-12 gap-x-5 lg:mt-20 mt-10">
    <section class="col-span-12 md:col-span-3">
      <Filters />
    </section>
    <section class="md:col-span-9 col-span-12">
      <SortBy />
      <section>
        <ul class="grid lg:grid-cols-2 grid-cols-1 lg:gap-20 gap-10">
          {#each products as product}
            <Product {product} />
          {/each}
        </ul>
      </section>
    </section>
  </div>
</main>
