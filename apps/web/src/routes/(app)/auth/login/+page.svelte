<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import FacebookIcon from "$lib/components/icons/facebook-icon.svelte";
  import GoogleIcon from "$lib/components/icons/google-icon.svelte";
  import { supabaseClient } from "$lib/supabase";
  import type { Provider } from "@supabase/supabase-js";
  export let form;

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

  const formAction: SubmitFunction = async ({ form }) => {
    return async ({ result, update }) => {
      if (result.type === "success") {
        form.reset();
      }
      update();
    };
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
    <h2 class="font-title | text-5xl font-thin">Login</h2>
    <form
      action="?/login"
      method="POST"
      use:enhance={formAction}
      class="flex flex-col | text-secondary | space-y-3 mt-10 | uppercase "
    >
      <label for="email"> Email </label>
      <input class="input_fild" type="text" name="email" />
      <label for="password"> Password </label>
      <input class="input_fild" type="password" name="password" />
      <div class="form-control">
        <label class="label !justify-start cursor-pointer">
          <input name="remember_me" type="checkbox" class="checkbox" />
          <span class="label-text pl-5">Remember me</span>
        </label>
      </div>
      <button type="submit" class="btn btn-wide bg-secondary border-none"
        >Login</button
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
  .input_fild {
    @apply py-3 text-sm border-b border-primary focus:outline-none bg-transparent appearance-none text-primary;
  }
</style>
