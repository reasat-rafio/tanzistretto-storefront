<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import Navbar from '$lib/components/navigation/navbar/navbar.svelte';
  import Promotion from '$lib/components/promotion.svelte';
  import { urlFor } from '$lib/sanity/sanity-client';
  import {
    forgotReq,
    resetReq,
    signInReq,
    signUpReq,
  } from '$lib/utils/validators';
  import '@fontsource/metropolis/300.css';
  import '@fontsource/metropolis/400.css';
  import '@fontsource/metropolis/500.css';
  import '@fontsource/metropolis/600.css';
  import '@fontsource/metropolis/700.css';
  import '@fontsource/metropolis/800.css';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { LayoutData } from './$types';
  import { authStore } from '$lib/stores/auth-store';
  import { uiStore } from '$lib/stores/ui-store';

  export let data: LayoutData;
  $: ({
    user,
    site: {
      nav,
      promotions,
      logos: { logo, favicon },
    },
  } = data);

  const handleSignIn = async function () {
    await invalidateAll();
    // await goto(data.rurl ? data.rurl : '/');
  };
  const signInForm = superForm(data.signInForm, {
    validators: zodClient(signInReq),
    onSubmit: () => {
      uiStore.setAuthLoading(true);
    },
    onResult: ({ result }) => {
      uiStore.setAuthLoading(false);

      if (result.type === 'success') {
        handleSignIn();
      } else {
      }
    },
  });

  const signUpForm = superForm(data.signUpForm, {
    validators: zodClient(signUpReq),
    onSubmit: () => {
      uiStore.setAuthLoading(true);
    },
    onResult: ({ result }) => {
      uiStore.setAuthLoading(false);

      if (result.type === 'success') {
        handleSignIn();
        // verify email
      } else {
      }
    },
  });

  const forgotForm = superForm(data.forgotForm, {
    validators: zodClient(forgotReq),
    onSubmit: () => {
      uiStore.setAuthLoading(true);
    },
    onResult: () => {
      uiStore.setAuthLoading(false);
    },
  });

  const resetForm = superForm(data.resetForm, {
    validators: zodClient(resetReq),
    onSubmit: () => {
      uiStore.setAuthLoading(true);
    },
    onResult: () => {
      uiStore.setAuthLoading(false);
    },
  });

  $: authStore.setUser(user);
  $: authStore.setSignInForm(signInForm);
  $: authStore.setSignUpForm(signUpForm);
  $: authStore.setForgotForm(forgotForm);
  $: authStore.setResetForm(resetForm);

  let faviconImage = favicon
    ? urlFor(favicon).size(256, 256).ignoreImageParams().url()
    : null;

  // onMount(() => {
  //   window.handleCredentialResponse = async (googleUser: unknown) => {
  //     await fetch('/auth/google', {
  //       method: 'POST',
  //       body: JSON.stringify(googleUser),
  //     }).catch((e) => {
  //       if (e) console.log(e);
  //     });
  //   };

  //   return () => {
  //     if ((window as any).handleCredentialResponse) {
  //       delete (window as any).handleCredentialResponse;
  //     }
  //   };
  // });
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={faviconImage} />
</svelte:head>

<main>
  <div class="sticky inset-0 z-30">
    <Promotion {promotions} />
    <Navbar {logo} {nav} />
  </div>
  <slot />
</main>
