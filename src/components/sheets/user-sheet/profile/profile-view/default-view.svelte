<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import Button from '$components/ui/button/button.svelte';
  import { userStore } from '$lib/stores/auth-store';
  import type { Direction, View } from '$lib/types/common.types';
  import { MapPin, RotateCw } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { fly } from 'svelte/transition';
  import * as Avatar from '$components/ui/avatar';

  export let view: View;
  export let direction: Direction;

  $: ({ user } = $userStore);

  let loading = false;
  const logout = async () => {
    try {
      loading = true;
      await fetch('/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      invalidateAll();
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error?.toString());
    } finally {
      loading = false;
    }
  };
</script>

<div in:fly={{ x: -30 }}>
  <div class="flex flex-col divide-y">
    <button class="group flex origin-left items-center gap-3 py-3">
      <div class="w-11">
        <Avatar.Root>
          <Avatar.Image
            height={14}
            width={14}
            src={user?.image}
            alt={user?.firstName} />
          <Avatar.Fallback>
            {user?.firstName.slice(0, 2).toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>
      </div>

      <div
        class="flex flex-col transition-transform duration-300 group-hover:translate-x-1">
        <div class=" text-left font-bold">My information</div>
        <div class="text-xs">{user?.email}</div>
      </div>
    </button>
    <button
      on:click={() => {
        direction = 'right';
        view = 'delivery-addresses';
      }}
      class="group flex items-center gap-3 py-3">
      <div class="w-11">
        <div class="w-fit rounded-sm bg-primary/40 p-1.5">
          <MapPin size={26} fill="#3A4743" strokeWidth={0} />
        </div>
      </div>
      <div
        class="flex flex-col transition-transform duration-300 group-hover:translate-x-1">
        <div class=" text-left font-bold">Shipping addresses</div>
      </div>
    </button>
  </div>

  <Button disabled={loading} on:click={logout} class="mt-3 w-full space-x-1">
    {#if loading}
      <RotateCw size={18} class="animate-spin" />
    {/if}
    <span>Logout</span>
  </Button>
</div>
