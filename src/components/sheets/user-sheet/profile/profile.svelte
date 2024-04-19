<script lang="ts">
  import Button from '$components/ui/button/button.svelte';
  import { authStore } from '$lib/stores/auth-store';
  import { uiStore } from '$lib/stores/ui-store';
  import { MapPin, RotateCw, User2Icon } from 'lucide-svelte';

  $: ({ user } = $authStore);

  const logout = async () => {};
</script>

<div class="space-y-2">
  {#if user}
    <div>
      <div class="flex flex-col divide-y">
        <button class="group flex origin-left items-center gap-3 py-3">
          <div class="rounded-sm bg-primary/40 p-1.5">
            <User2Icon size={18} fill="#3A4743" strokeWidth={0} />
          </div>
          <div
            class="flex flex-col transition-transform duration-300 group-hover:translate-x-1">
            <div class=" text-left font-bold">My information</div>
            <!-- <div class="text-xs">{user.email}</div> -->
          </div>
        </button>
        <button class="group flex items-center gap-3 py-3">
          <div class="rounded-sm bg-primary/40 p-1.5">
            <MapPin size={18} fill="#3A4743" strokeWidth={0} />
          </div>
          <div
            class="flex flex-col transition-transform duration-300 group-hover:translate-x-1">
            <div class=" text-left font-bold">Shipping addresses</div>
          </div>
        </button>
      </div>

      <Button
        on:click={logout}
        disabled={$uiStore.authLoading}
        class="w-full space-x-1">
        {#if $uiStore.authLoading}
          <RotateCw size={18} class="animate-spin" />
        {/if}
        <span>Logout</span>
      </Button>
    </div>
  {:else}
    <h2 class="text-2xl font-bold">
      Manage address, contact info and personal preferences
    </h2>

    <h3 class="text-lg">
      To create an account, please sign in using Google or Facebook
      authentication.
    </h3>

    <div class="space-y-3 pt-3">
      <Button
        href="/auth/login/google"
        class="flex w-full items-center justify-center space-x-1.5 bg-[#1877F2] shadow hover:bg-[#1877F2]/90">
        <img
          src="/icons/facebook.svg"
          alt="Facebook Icon"
          width={20}
          height={20} />
        <span>Continue With Facebook</span>
      </Button>
      <Button
        href="/auth/login/google"
        class="flex w-full items-center justify-center space-x-1.5 bg-muted text-primary shadow hover:bg-muted/90">
        <img src="/icons/google.svg" alt="Google Icon" width={20} height={20} />
        <span>Continue With Google</span>
      </Button>
    </div>
  {/if}
</div>
