<script lang="ts">
  import Button from '$components/ui/button/button.svelte';
  import type { View, Direction } from '$lib/types/common.types';
  import { MoveLeft } from 'lucide-svelte';
  import { fly } from 'svelte/transition';
  import Form from './form.svelte';

  export let direction: Direction;
  export let view: View;
  export let activeEditingAddressID: string;
</script>

<div in:fly={{ x: 30 }}>
  <div class="relative flex items-center justify-end py-3">
    <Button
      size="sm"
      variant="outline"
      class="group absolute left-0 top-1/2 -translate-y-1/2"
      on:click={() => {
        view = 'delivery-addresses';
        direction = 'left';
      }}>
      <MoveLeft
        class="transition-transform duration-300 group-hover:-translate-x-0.5"
        size={14}
        stroke="#3A4743" />
    </Button>
    <span class="text-xl font-medium underline">Edit Addresses</span>
  </div>
  <Form bind:view {activeEditingAddressID} />
</div>
