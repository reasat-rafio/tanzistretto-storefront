<script lang="ts">
  import type { Direction, View } from '$lib/types/common.types';
  import DefaultView from './default-view.svelte';
  import AddDeliveryAddress from './delivery-address/add/add-delivery-address.svelte';
  import EditAddressView from './delivery-address/edit/edit-address-view.svelte';
  import DeliveryAddressView from './delivery-address/delivery-address.svelte';

  let view: View = 'default';
  let direction: Direction = 'left';
</script>

<div>
  {#if view === 'default'}
    <DefaultView bind:view bind:direction />
  {:else if view === 'delivery-addresses'}
    <DeliveryAddressView bind:view bind:direction />
  {:else if view === 'edit-delivery-address'}
    <EditAddressView bind:view bind:direction />
  {:else if view === 'add-delivery-address'}
    <AddDeliveryAddress bind:view bind:direction />
  {/if}
</div>
