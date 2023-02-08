<script lang="ts">
  import { makeOpenGraphImages } from "$lib/helpers/global.helper";
  import { setContext } from "svelte";
  import SvelteSeo from "svelte-seo";
  import Hero from "$components/[product]/hero/hero.svelte";
  import type { ProductProps } from "$lib/@types/product.types";

  export let data;
  const { product } = data.data;

  setContext("product", product as ProductProps);
</script>

<SvelteSeo
  title={product.seo.title}
  description={product.seo.description}
  openGraph={{
    images: makeOpenGraphImages(product.seo.ogImage, product.seo.title),
  }}
/>
<main>
  <Hero />
</main>
