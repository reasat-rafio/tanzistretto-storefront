<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Form from '$lib/components/ui/form';
  import Input from '$lib/components/ui/input/input.svelte';
  import { uiStore } from '$lib/stores/ui-store';
  import type { loginPostReq } from '$lib/utils/validators';
  import { Eye, EyeOff, RotateCw } from 'lucide-svelte';
  import type { SuperForm } from 'sveltekit-superforms';
  import type { z } from 'zod';

  export let loginForm: SuperForm<z.infer<typeof loginPostReq>>;
  let reveal = false;

  $: ({ form, enhance, message } = loginForm);
</script>

<form method="POST" action="/auth?/login" use:enhance>
  <Form.Field form={loginForm} name="email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input {...attrs} bind:value={$form.email} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field form={loginForm} name="password">
    <Form.Control let:attrs>
      <Form.Label>Password</Form.Label>
      <div class="relative">
        <Input
          {...attrs}
          type={reveal ? 'text' : 'password'}
          bind:value={$form.password} />
        <button
          type="button"
          on:click|stopPropagation={() => (reveal = !reveal)}
          class="absolute right-5 top-1/2 z-20 -translate-y-1/2">
          {#if reveal}
            <Eye size={18} />
          {:else}
            <EyeOff size={18} />
          {/if}
        </button>
      </div>
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button disabled={$uiStore.authLoading} class="mt-2 w-full space-x-1">
    {#if $uiStore.authLoading}
      <RotateCw size={18} class="animate-spin" />
    {/if}
    <span>Submit</span>
  </Form.Button>
</form>

<Button
  href="http://localhost:9000/store/auth/google"
  class="mb-2 mr-2 inline-flex items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55">
  <svg
    class="-ml-1 mr-2 h-4 w-4"
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="google"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 488 512">
    <path
      fill="currentColor"
      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
    </path>
  </svg>
  Sign in with Google
</Button>
<Button
  href="http://localhost:9000/store/auth/facebook"
  class="mb-2 mr-2 inline-flex items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55">
  Sign in with Facebook
</Button>
