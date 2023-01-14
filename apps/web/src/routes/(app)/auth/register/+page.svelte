<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import { goto } from "$app/navigation";
  import type { IFormError } from "$lib/@types/global.types";
  import FacebookIcon from "$components/icons/facebook-icon.svelte";
  import GoogleIcon from "$components/icons/google-icon.svelte";
  import Input from "$components/ui/input.svelte";
  import { navbarHeight } from "$lib/stores/global.store";
  import { supabaseClient } from "$lib/supabase";
  import {
    RegisterSchema,
    type IRegisterSchema,
  } from "$lib/validations/register";
  import type { Provider } from "@supabase/supabase-js";
  import { z } from "zod";
  import type { ActionData } from "./$types";

  // TODO add types
  export let form: any;
  let formError: IFormError;
  $: termsError = form?.errors?.terms ?? formError?.terms;

  const signInWithProvider = async (provider: Provider) => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: provider,
    });
  };

  const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
    switch (action.searchParams.get("provider")) {
      case "google":
        await signInWithProvider("google");
        break;
      case "facebook":
        await signInWithProvider("facebook");
        break;
      default:
        break;
    }
    cancel();
  };

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
      else goto("/");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const { fieldErrors: errors } = err.flatten();
        formError = errors;
      }
    }
    cancel();
  };
</script>

<main
  style="min-height: calc(100vh - {$navbarHeight}px);"
  class="container mx-auto pt-20"
>
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
        error={form?.errors?.username || formError?.username}>Username</Input
      >
      <Input type="email" name="email" error={form?.errors?.email}>Email</Input>
      <Input
        type="password"
        name="password"
        error={form?.errors?.password || formError?.password}>Password</Input
      >
      <Input
        type="password"
        name="passwordConfirm"
        error={form?.errors?.passwordConfirm || formError?.passwordConfirm}
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

    <form
      class="flex space-x-5 py-5"
      method="POST"
      use:enhance={submitSocialLogin}
    >
      <button
        formaction="?/register&provider=facebook"
        class="btn btn-wide bg-secondary border-none flex space-x-2"
      >
        <FacebookIcon />
      </button>
      <button
        formaction="?/register&provider=google"
        class="btn btn-wide bg-secondary border-none flex space-x-2"
      >
        <GoogleIcon />
      </button>
      <button />
    </form>
  </section>
</main>

<style lang="postcss">
  .error_msg {
    @apply text-xs text-error mt-1 lowercase;
  }
</style>
