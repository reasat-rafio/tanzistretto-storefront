<script lang="ts">
  import type { PageData } from './$types';
  import * as Alert from '$lib/components/ui/alert';
  import { Rocket, TriangleAlert } from 'lucide-svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { uiStore } from '$lib/stores/ui-store';

  export let data: PageData;
</script>

<div class="container flex min-h-[80vh] items-center justify-center">
  <div class="flex flex-col gap-5">
    <h1 class="text-5xl font-semibold">Email Verification</h1>

    {#if !!data.success.errorCode}
      <Alert.Root variant="destructive">
        <TriangleAlert class="h-4 w-4" />
        <Alert.Title>Error!</Alert.Title>
        <Alert.Description>
          {data.success.message}
        </Alert.Description>
      </Alert.Root>
    {:else}
      <Alert.Root variant="default">
        <Rocket class="h-4 w-4" />
        <Alert.Title>
          Success! Your email has been verified successfully!
        </Alert.Title>
        <Alert.Description>
          You can sign in with your credentials now.
        </Alert.Description>
      </Alert.Root>
      <div class="grid grid-cols-2 justify-end gap-3">
        <Button variant="secondary" href="/shop">Shop</Button>
        <Button on:click={() => uiStore.setUserSheetOpen(true)}>Login</Button>
      </div>
    {/if}
  </div>
</div>
