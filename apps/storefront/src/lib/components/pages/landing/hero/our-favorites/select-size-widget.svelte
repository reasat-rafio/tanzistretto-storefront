<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';

  interface Size {
    name: string;
    code: string;
    facet: {
      name: string;
    };
  }

  export let activeVariantId: string;
  export let sizes: Size[];
  // export let addItemTOBag: (size: Size) => void;

  async function addToBag(size: Size) {
    try {
      const data = await fetch('/api/add-to-bag', {
        method: 'POST',
        body: JSON.stringify({ variantId: activeVariantId, size }),
      });

      const res = await data.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div
  class="absolute bottom-0 left-1/2 mx-auto h-auto w-5/6 -translate-x-1/2 translate-y-[120%] pb-5 transition-transform duration-500 hover:!translate-y-0 group-hover:translate-y-[70%]">
  <div class="rounded-2xl bg-white p-3 shadow-md ease-in-out">
    <div class="text-center text-sm font-bold">Select a size</div>

    <div class="mt-1 flex items-center justify-center gap-x-1">
      <input value={activeVariantId} type="text" class="hidden" />
      {#each sizes as size}
        <Button
          on:click={() => addToBag(size)}
          class="text-xxs h-8 w-8 !rounded-sm font-semibold"
          size="icon"
          variant="outline">
          {size.name}
        </Button>
      {/each}
    </div>
  </div>
</div>
