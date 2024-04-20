<script lang="ts">
  import Button from '$components/ui/button/button.svelte';
  import { userStore } from '$lib/stores/auth-store';
  import type { View, Direction } from '$lib/types/common.types';
  import { Edit2Icon, MoveLeft, Star, Trash2Icon } from 'lucide-svelte';
  import * as Card from '$components/ui/card/index.js';
  import { fly, scale } from 'svelte/transition';
  import { Badge } from '$components/ui/badge';
  import { toast } from 'svelte-sonner';
  import { invalidateAll } from '$app/navigation';
  import * as Tooltip from '$components/ui/tooltip';
  import { cn } from '$lib/utils/helpers';
  import { flip } from 'svelte/animate';

  export let view: View;
  export let direction: Direction;
  export let activeEditingAddressID: string;

  let loadingDelete = false;
  let loadingSetDefault = false;
  $: ({ deliveryAddress } = $userStore);
  $: defaultAddressId = deliveryAddress?.find(
    (address) => address.isDefault,
  )?.id;

  $: orderedDeliveryAddress = deliveryAddress?.sort((a, b) => {
    if (a.isDefault) return -1;
    if (b.isDefault) return 1;
    return 0;
  });

  async function deleteAddress(id: string) {
    try {
      loadingDelete = true;
      await fetch('/api/delivery-address/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      toast.success('Address deleted successfully');
      invalidateAll();
    } catch (error) {
      toast.error('An error occurred while deleting the address');
    } finally {
      loadingDelete = false;
    }
  }

  async function setAsDefaultAddress(id: string) {
    if (defaultAddressId === id) {
      toast.info('Address is already set as default');
      return;
    }

    try {
      loadingSetDefault = true;
      await fetch('/api/delivery-address/set-default', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      toast.success('Address set as default successfully');
      invalidateAll();
    } catch (error) {
      toast.error('An error occurred while setting the address as default');
    } finally {
      loadingSetDefault = false;
    }
  }
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

  {#if orderedDeliveryAddress}
    <div class="mt-5 space-y-3">
      {#each orderedDeliveryAddress as { address1, address2, city, fullName, isDefault, phoneNumber, postalCode, id } (id)}
        <div transition:scale animate:flip={{ duration: 700 }}>
          <Card.Root class="relative">
            <Card.Header>
              <div class="flex justify-between">
                <Card.Title>
                  {fullName}
                  {#if isDefault}
                    <Badge variant="secondary">Default</Badge>
                  {/if}
                </Card.Title>

                <div class="space-x-1">
                  <Tooltip.Root>
                    <Tooltip.Trigger>
                      <button
                        disabled={loadingSetDefault}
                        on:click={() => setAsDefaultAddress(id)}
                        class="rounded-full p-2 text-primary transition-all duration-300 hover:bg-secondary hover:shadow-md">
                        <Star
                          class={cn({
                            'fill-primary': defaultAddressId === id,
                          })}
                          size={16} />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <p>Set as default</p>
                    </Tooltip.Content>
                  </Tooltip.Root>
                  <Tooltip.Root>
                    <Tooltip.Trigger>
                      <button
                        on:click={() => {
                          activeEditingAddressID = id;
                          view = 'edit-delivery-address';
                        }}
                        class="rounded-full p-2 text-primary transition-all duration-300 hover:bg-secondary hover:shadow-md">
                        <Edit2Icon size={16} />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <p>Edit Address</p>
                    </Tooltip.Content>
                  </Tooltip.Root>

                  <Tooltip.Root>
                    <Tooltip.Trigger>
                      <button
                        disabled={loadingDelete}
                        on:click={() => deleteAddress(id)}
                        class="rounded-full p-2 text-primary transition-all duration-300 hover:bg-secondary hover:shadow-md">
                        <Trash2Icon size={16} />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <p>Delete Address</p>
                    </Tooltip.Content>
                  </Tooltip.Root>
                </div>
              </div>
              <Card.Description>
                {phoneNumber}
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <p>{address1}</p>
              <p>{address2}</p>
              <p>
                {city}
                {postalCode}
              </p>
            </Card.Content>
          </Card.Root>
        </div>
      {/each}
    </div>
  {/if}

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
