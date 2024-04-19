<script lang="ts">
  import Button from '$components/ui/button/button.svelte';
  import * as Form from '$components/ui/form';
  import Input from '$components/ui/input/input.svelte';
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
  href="http://localhost:9000/store/auth/google/"
  variant="destructive"
  class="">
  Sign in with Google
</Button>
<Button
  href="http://localhost:9000/store/auth/facebook"
  class="mb-2 mr-2 inline-flex items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55">
  Sign in with Facebook
</Button>
