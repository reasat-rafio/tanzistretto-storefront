<script lang="ts">
  import * as Form from '$components/ui/form';
  import Input from '$components/ui/input/input.svelte';
  import type { registerPostReq } from '$lib/utils/validators';
  import { Eye, EyeOff, RotateCw } from 'lucide-svelte';
  import type { SuperForm } from 'sveltekit-superforms';
  import type { z } from 'zod';
  import { uiStore } from '$lib/stores/ui-store';

  export let registerForm: SuperForm<z.infer<typeof registerPostReq>>;
  let reveal = false;

  $: ({ form, enhance } = registerForm);
</script>

<form method="POST" action="/auth?/register">
  <Form.Field form={registerForm} name="firstName">
    <Form.Control let:attrs>
      <Form.Label>First Name</Form.Label>
      <Input {...attrs} bind:value={$form.firstName} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field form={registerForm} name="lastName">
    <Form.Control let:attrs>
      <Form.Label>Last Name</Form.Label>
      <Input {...attrs} bind:value={$form.lastName} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field form={registerForm} name="email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input {...attrs} bind:value={$form.email} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field form={registerForm} name="password">
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

<div class="text-center">
  By signing up, you agree with our <a class="underline" href="/">
    privacy policy
  </a>
  and
  <a class="underline" href="/">terms and service</a>
</div>
