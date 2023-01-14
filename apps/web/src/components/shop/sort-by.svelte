<script>
  import ExpendIcon from "../icons/expend-icon.svelte";

  let expend = true;
</script>

<aside>
  <button
    class="w-fit | flex cursor-pointer | my-7 py-2 | ml-auto border-b border-cinereous min-w-[270px]"
    on:click={() => (expend = !expend)}
  >
    <h3 class="flex-1 uppercase text-xl text-left">Sort By</h3>
    <ExpendIcon {expend} />
  </button>
</aside>
