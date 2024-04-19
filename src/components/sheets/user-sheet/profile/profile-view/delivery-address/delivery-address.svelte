<script lang="ts">
  import Button from '$components/ui/button/button.svelte';
  import { authStore } from '$lib/stores/auth-store';
  import type { View, Direction } from '$lib/types/common.types';
  import { Edit2Icon, MoveLeft, Trash2Icon } from 'lucide-svelte';
  import * as Card from '$components/ui/card/index.js';
  import { fly, slide } from 'svelte/transition';

  export let direction: Direction;
  export let view: View;

  const { user } = $authStore;
</script>

<div in:fly={{ x: direction === 'right' ? 30 : -30 }}>
  <div class="relative flex items-center justify-end py-3">
    <Button
      size="sm"
      variant="outline"
      class="group absolute left-0 top-1/2 -translate-y-1/2"
      on:click={() => {
        view = 'default';
        direction = 'left';
      }}>
      <MoveLeft
        class="transition-transform duration-300 group-hover:-translate-x-0.5"
        size={14}
        stroke="#3A4743" />
    </Button>
    <span class="text-xl font-medium underline">Addresses</span>
  </div>

  <p class="text-sm">
    View and update your shipping addresses, you can add as many as you like.
    Saving your addresses will make them available during checkout.
  </p>

  <!-- {#if !user?.shipping_addresses?.length}
    <div class="mt-5 space-y-3">
      {#each user.shipping_addresses as { first_name, last_name, id, phone, city, postal_code, address_1, address_2 }}
        <Card.Root class="relative">
          <div class="absolute right-2 top-2 space-x-2">
            <button
              on:click={() => {
                view = 'edit-delivery-address';
              }}
              class="rounded-full p-1.5 text-primary transition-all duration-300 hover:bg-secondary hover:shadow-md">
              <Edit2Icon size={14} />
            </button>

            <button
              class="rounded-full p-1.5 text-primary transition-all duration-300 hover:bg-secondary hover:shadow-md">
              <Trash2Icon size={16} />
            </button>
          </div>

          <Card.Header>
            <Card.Title>{first_name} {last_name}</Card.Title>
            <Card.Description>
              {phone}
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <p>{address_1}</p>
            <p>{address_2}</p>
            <p>
              {city}
              {postal_code}
            </p>
          </Card.Content>
        </Card.Root>
      {/each}
    </div>
  {/if} -->

  <Button
    size="lg"
    on:click={() => {
      view = 'add-delivery-address';
      direction = 'right';
    }}
    class="mt-5 w-full border-2 font-semibold uppercase "
    variant="default">
    Add Address
  </Button>
</div>
