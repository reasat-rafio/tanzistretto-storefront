<script lang="ts">
  import { getContext } from "svelte";
  import ExpendIcon from "../icons/expend-icon.svelte";

  const materials = getContext("materials");

  let expend = false;
</script>

<div>
  <div class="flex cursor-pointer w-full" on:click={() => (expend = !expend)}>
    <h3 class="flex-1">Material</h3>
    <ExpendIcon {expend} />
  </div>
</div>
