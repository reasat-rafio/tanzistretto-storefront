<script lang="ts">
  import { getContext } from "svelte";

  const categories = getContext("categories");
  console.log({ categories });
</script>

<div>Categories</div>
