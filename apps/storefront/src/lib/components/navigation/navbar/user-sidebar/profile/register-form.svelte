<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import Input from '$lib/components/ui/input/input.svelte';
  import type { signUpReq } from '$lib/utils/validators';
  import { Eye, EyeOff, RotateCw } from 'lucide-svelte';
  import type { SuperForm } from 'sveltekit-superforms';
  import type { z } from 'zod';
  import { uiStore } from '$lib/stores/ui-store';

  export let signUpForm: SuperForm<z.infer<typeof signUpReq>>;
  let reveal = false;

  $: ({ form, enhance } = signUpForm);
</script>

<form method="POST" action="/auth?/signUp" use:enhance>
  <Form.Field form={signUpForm} name="fname">
    <Form.Control let:attrs>
      <Form.Label>First Name</Form.Label>
      <Input {...attrs} bind:value={$form.fname} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field form={signUpForm} name="lname">
    <Form.Control let:attrs>
      <Form.Label>Last Name</Form.Label>
      <Input {...attrs} bind:value={$form.lname} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field form={signUpForm} name="email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input {...attrs} bind:value={$form.email} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field form={signUpForm} name="password">
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
