<script lang="ts">
  import { authStore } from '$lib/stores/auth-store';
  import RegisterForm from './register-form.svelte';
  import * as Tabs from '$lib/components/ui/tabs';
  import SignInForm from './sign-in-form.svelte';

  $: ({ signUpForm, signInForm } = $authStore);
</script>

<div class="space-y-2">
  <h2 class="text-2xl font-bold">
    Manage address, contact info and personal preferences
  </h2>

  <div>
    <h3 class="text-lg">
      To create an account, please enter your email and choose a password below.
    </h3>
  </div>

  <Tabs.Root value="register" class="mx-auto mt-2">
    <Tabs.List class="w-full">
      <Tabs.Trigger value="login">Login</Tabs.Trigger>
      <Tabs.Trigger value="register">Register</Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="login">
      {#if signInForm}
        <SignInForm {signInForm} />
      {/if}
    </Tabs.Content>
    <Tabs.Content value="register">
      {#if signUpForm}
        <RegisterForm {signUpForm} />
      {/if}
    </Tabs.Content>
  </Tabs.Root>
</div>
