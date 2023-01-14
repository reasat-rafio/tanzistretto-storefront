<script lang="ts">
  import { navbarHeight } from "$lib/stores/global.store";
  import Categories from "./categories.svelte";
  import Material from "./material.svelte";
</script>

<aside
  class="flex flex-col space-y-2 sticky left-0"
  style="top:{$navbarHeight + 20}px"
>
  <Categories />
  <Material />
</aside>
