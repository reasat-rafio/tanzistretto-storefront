<script lang="ts">
  import Navbar from '$components/navigation/navbar/navbar.svelte';
  import Promotion from '$components/promotion.svelte';
  import { Toaster } from '$components/ui/sonner';
  import { urlFor } from '$lib/sanity/sanity-client';
  import '@fontsource/metropolis/300.css';
  import '@fontsource/metropolis/400.css';
  import '@fontsource/metropolis/500.css';
  import '@fontsource/metropolis/600.css';
  import '@fontsource/metropolis/700.css';
  import '@fontsource/metropolis/800.css';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
  $: ({
    site: {
      nav,
      promotions,
      logos: { logo, favicon },
    },
  } = data);

  // const signInForm = superForm(data.signInForm, {
  //   validators: zodClient(loginPostReq),
  //   invalidateAll: true,
  //   onSubmit: () => {
  //     uiStore.setAuthLoading(true);
  //   },
  //   onResult: ({ result }) => {
  //     uiStore.setAuthLoading(false);
  //     console.log(result);
  //     if (result.type === 'success') {
  //       // handleSignIn();
  //       toast.success("You've successfully logged in!");
  //     } else {
  //       const errorMessage = (result as any).data?.form?.message;
  //       if (!!errorMessage) toast.error(errorMessage);
  //     }
  //   },
  // });

  // const signUpForm = superForm(data.signUpForm, {
  //   validators: zodClient(registerPostReq),
  //   invalidateAll: true,
  //   onSubmit: () => {
  //     uiStore.setAuthLoading(true);
  //   },
  //   onResult: ({ result }) => {
  //     uiStore.setAuthLoading(false);

  //     if (result.type === 'success') {
  //       // handleSignIn();

  //       toast.info((result as any).data?.form?.message);
  //     } else {
  //       const errorMessage = (result as any).data?.form?.message;
  //       if (!!errorMessage) toast.error(errorMessage);
  //     }
  //   },
  // });

  // const forgotForm = superForm(data.forgotForm, {
  //   validators: zodClient(forgotPostReq),
  //   invalidateAll: true,
  //   onSubmit: () => {
  //     uiStore.setAuthLoading(true);
  //   },
  //   onResult: () => {
  //     uiStore.setAuthLoading(false);
  //   },
  // });

  // const resetForm = superForm(data.resetForm, {
  //   validators: zodClient(resetPostReq),
  //   invalidateAll: true,
  //   onSubmit: () => {
  //     uiStore.setAuthLoading(true);
  //   },
  //   onResult: () => {
  //     uiStore.setAuthLoading(false);
  //   },
  // });

  // $: authStore.setUser(user);
  // $: authStore.setSignInForm(signInForm);
  // $: authStore.setSignUpForm(signUpForm);
  // $: authStore.setForgotForm(forgotForm);
  // $: authStore.setResetForm(resetForm);

  let faviconImage = favicon
    ? urlFor(favicon).size(256, 256).ignoreImageParams().url()
    : null;
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={faviconImage} />
</svelte:head>

<Toaster richColors position="bottom-left" />
<div class="sticky inset-0 z-30">
  <Promotion {promotions} />
  <Navbar {logo} {nav} />
</div>
<slot />
