<script>
  import * as Sheet from '$lib/components/ui/sheet/index';
  import { uiStore } from '$lib/stores/ui-store';
  import { ShoppingBag } from 'lucide-svelte';
</script>

<Sheet.Root bind:open={$uiStore.openBagSheet}>
  <Sheet.Trigger>
    <ShoppingBag />
  </Sheet.Trigger>
  <Sheet.Content class="w-full overflow-auto">
    <Sheet.Header>
      <Sheet.Title>YOUR BAG</Sheet.Title>
      <Sheet.Description>Your cart is empty</Sheet.Description>
    </Sheet.Header>
  </Sheet.Content>
</Sheet.Root>
