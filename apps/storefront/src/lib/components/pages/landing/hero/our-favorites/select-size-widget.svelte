<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';

  interface Size {
    name: string;
    code: string;
    facet: {
      name: string;
    };
  }

  export let sizes: Size[];

  $: {
    console.log(sizes);
  }
</script>

<div
  class="absolute bottom-0 left-1/2 mx-auto h-auto w-5/6 -translate-x-1/2 translate-y-[120%] pb-5 transition-transform duration-500 hover:!translate-y-0 group-hover:translate-y-[70%]">
  <div class="rounded-2xl bg-white p-3 shadow-md ease-in-out">
    <div class="text-center text-sm font-bold">Select a size</div>

    <div class="mt-1 flex items-center justify-center gap-x-1">
      {#each sizes as { name }}
        <Button
          class="text-xxs h-8 w-8 !rounded-sm font-semibold"
          size="icon"
          variant="outline">
          {name}
        </Button>
      {/each}
    </div>
  </div>
</div>
