<script lang="ts">
  import type { PageData } from './$types';
  import type { Collection } from '$lib/generated/graphql';
  // import VendureAsset from '$lib/components/VendureAsset.svelte'
  // import ProductList from '$lib/components/ProductList.svelte'
  // import MetaTags from '$lib/components/MetaTags.svelte'
  export let data: PageData;
  $: collection = data.collection as Collection;
  $: products = data.products;
</script>

<!-- <MetaTags title={collection.name} description={collection.description} /> -->
<section class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
  <h1
    class="my-4 text-2xl font-bold tracking-tight text-gray-900 sm:my-6 sm:text-3xl">
    {collection.name}
  </h1>
  <section
    class="relative mb-8 hidden w-full sm:mb-16 sm:block sm:h-80 lg:h-96">
    <!-- <VendureAsset preview={collection.featuredAsset?.preview} preset="large" alt={collection.name} class="absolute object-cover w-full h-full rounded-md"/> -->
    <div
      class="absolute inset-0 flex items-center justify-center rounded-md bg-black/30">
      <h1 class="text-3xl font-bold text-white">{collection.name}</h1>
    </div>
  </section>
  <!-- <ProductList {products} /> -->
</section>
