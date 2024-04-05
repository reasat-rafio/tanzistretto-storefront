<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs';
  import { authStore } from '$lib/stores/auth-store';
  import { MapPin, RotateCw, User2Icon } from 'lucide-svelte';
  import LoginForm from './login-form.svelte';
  import RegisterForm from './register-form.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { uiStore } from '$lib/stores/ui-store';
  import { toast } from 'svelte-sonner';
  import { invalidateAll } from '$app/navigation';

  $: ({ signUpForm, signInForm, user } = $authStore);

  const logout = async () => {
    uiStore.setAuthLoading(true);

    try {
      const formData = new FormData(); // The POST request fails without a body
      const res = await fetch('/auth?/logout', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        await invalidateAll();
        toast.success("You've successfully logged out!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      uiStore.setAuthLoading(false);
    }
  };
</script>

<div class="space-y-2">
  {#if user}
    <div>
      <div class="flex flex-col divide-y">
        <button class="group flex origin-left items-center gap-3 py-3">
          <div class="bg-primary/40 rounded-sm p-1.5">
            <User2Icon size={18} fill="#3A4743" strokeWidth={0} />
          </div>
          <div
            class="flex flex-col transition-transform duration-300 group-hover:translate-x-1">
            <div class=" text-left font-bold">My information</div>
            <div class="text-xs">{user.email}</div>
          </div>
        </button>
        <button class="group flex items-center gap-3 py-3">
          <div class="bg-primary/40 rounded-sm p-1.5">
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
      To create an account, please enter your email and choose a password below.
    </h3>

    <Tabs.Root value="login" class="mx-auto mt-2">
      <Tabs.List class="w-full">
        <Tabs.Trigger value="login">Login</Tabs.Trigger>
        <Tabs.Trigger value="register">Register</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="login">
        {#if signInForm}
          <LoginForm loginForm={signInForm} />
        {/if}
      </Tabs.Content>
      <Tabs.Content value="register">
        {#if signUpForm}
          <RegisterForm registerForm={signUpForm} />
        {/if}
      </Tabs.Content>
    </Tabs.Root>
  {/if}
</div>
