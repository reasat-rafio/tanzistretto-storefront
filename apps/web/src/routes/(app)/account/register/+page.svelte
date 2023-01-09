<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import { goto } from "$app/navigation";
  import type { IFormError } from "$lib/@types/globa.types";
  import Input from "$lib/components/ui/input.svelte";
  import { supabaseClient } from "$lib/supabase";
  import {
    RegisterSchema,
    type IRegisterSchema,
  } from "$lib/validations/register";
  import { z } from "zod";
  import type { ActionData } from "./$types";

  export let form: ActionData;
  let formError: IFormError;

  $: termsError = form?.errors?.terms ?? formError?.terms;

  const formAction: SubmitFunction = async ({
    form: formNode,
    cancel,
    data: formData,
  }) => {
    new FormData(formNode).forEach((value, key) => formData.set(key, value));
    try {
      const _formData = Object.fromEntries(formData) as IRegisterSchema;
      const { email, password, username } = RegisterSchema.parse(_formData);
      const { error: err } = await supabaseClient.auth.signUp({
        email,
        password,
        options: { data: { username } },
      });
      if (err) console.log(err);
      goto("/");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const { fieldErrors: errors } = err.flatten();
        formError = errors;
      }
    }
    cancel();
  };
</script>

<main class="container mx-auto my-40">
  <section>
    <header>
      <h1 class="flex flex-col | text-7xl | uppercase">
        <span class="ml-10 | font-light text-black">My</span>
        <span class="font-title font-thin ">Account</span>
      </h1>
    </header>
  </section>
  <section class="mt-20">
    <h2 class="font-title | text-5xl font-thin">Register</h2>
    <form
      use:enhance={formAction}
      action="?/register"
      method="POST"
      class="flex flex-col | text-secondary | space-y-3 mt-10 | uppercase "
    >
      <Input
        type="text"
        name="username"
        erros={form?.errors?.username || formError?.username}>Username</Input
      >
      <Input type="email" name="email" erros={form?.errors?.email}>Email</Input>
      <Input
        type="password"
        name="password"
        erros={form?.errors?.password || formError?.password}>Password</Input
      >
      <Input
        type="password"
        name="passwordConfirm"
        erros={form?.errors?.passwordConfirm || formError?.passwordConfirm}
        >Confirm Password</Input
      >
      <div class="form-control">
        <label class="label !justify-start cursor-pointer">
          <input name="terms" type="checkbox" class="checkbox" />
          <span class="label-text pl-5"
            >Accept <a
              class="hover:!text-cinereous underline"
              href="/terms-condition">Terms and Conditions</a
            ></span
          >
        </label>
        {#if termsError}
          {#each termsError as err}
            <span class="error_msg">{err}</span>
          {/each}
        {/if}
      </div>
      <button type="submit" class="btn btn-wide bg-secondary border-none"
        >Register</button
      >
    </form>
  </section>
</main>

<style lang="postcss">
  .error_msg {
    @apply text-xs text-error mt-1 lowercase;
  }
</style>
