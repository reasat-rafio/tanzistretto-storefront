<script lang="ts">
  import { setContext } from "svelte";
  import Hero from "./components/hero/hero.svelte";

  export let data;
  const { product } = data.data;

  setContext("product", product);
</script>

<main>
  <Hero />
</main>
