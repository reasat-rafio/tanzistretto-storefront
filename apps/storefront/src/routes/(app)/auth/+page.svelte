<script lang="ts">
  import type { PageData } from './$types';
  import { page } from '$app/stores';
  import { goto, invalidateAll } from '$app/navigation';
  import { Turnstile } from 'sveltekit-turnstile';
  // import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public'
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import {
    signInReq,
    signUpReq,
    forgotReq,
    resetReq,
  } from '$lib/utils/validators';

  import * as Form from '$lib/components/ui/form';
  import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let data: PageData;

  type state = 'signIn' | 'signUp' | 'forgot' | 'reset';
  let state = data.code ? 'reset' : 'signIn';
  let token: string = ''; // turnstile token
  let code: string = data.code; // reset code
  let reveal: boolean = false;
  let processing: boolean = false;

  const handleSignIn = async function () {
    await invalidateAll();
    await goto(data.rurl ? data.rurl : '/');
  };

  const signInForm = superForm(data.signInForm, {
    validators: zodClient(signInReq),
    onSubmit: () => {
      processing = true;
    },
    onResult: ({ result }) => {
      if (result.type === 'success') {
        handleSignIn();
      } else {
        // token = '';
        processing = false;
      }
    },
  });
  const {
    form: signInFormData,
    enhance: signInEnhance,
    message: signInMessage,
  } = signInForm;
  //   $: $signInFormData.token = token;

  const signUpForm = superForm(data.signUpForm, {
    validators: zodClient(signUpReq),
    onSubmit: () => {
      processing = true;
    },
    onResult: ({ result }) => {
      console.log(result);
      if (result.type === 'success') {
        handleSignIn();
        // verify email
      } else {
        token = '';
        processing = false;
      }
    },
  });
  const {
    form: signUpFormData,
    enhance: signUpEnhance,
    message: signUpMessage,
  } = signUpForm;
  //   $: $signUpFormData.token = token;

  const forgotForm = superForm(data.forgotForm, {
    validators: zodClient(forgotReq),
    onSubmit: () => {
      processing = true;
    },
    onResult: ({ result }) => {
      token = '';
      processing = false;
    },
  });
  const {
    form: forgotFormData,
    enhance: forgotEnhance,
    message: forgotMessage,
  } = forgotForm;
  //   $: $forgotFormData.token = token;

  const resetForm = superForm(data.resetForm, {
    validators: zodClient(resetReq),
    onSubmit: () => {
      processing = true;
    },
    onResult: ({ result }) => {
      token = '';
      processing = false;
    },
  });
  const {
    form: resetFormData,
    enhance: resetEnhance,
    message: resetMessage,
  } = resetForm;
  //   $: $resetFormData.token = token;
  $: $resetFormData.code = code;

  // function onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }
  let loaded = false;
  onMount(() => (loaded = true));
</script>

<!-- {#if !token}
		<Turnstile
			theme="light"
			siteKey={PUBLIC_TURNSTILE_SITE_KEY}
			on:turnstile-callback={(e) => { token = e.detail.token }}
		/> -->

{#if loaded}
  <div
    id="g_id_onload"
    data-client_id={PUBLIC_GOOGLE_CLIENT_ID}
    data-callback="handleCredentialResponse">
  </div>
  <div class="g_id_signin mt-10 bg-red-600" data-type="standard"></div>
{/if}

{#if state === 'signIn'}
  {#if processing}
    <div class="message">Processing...</div>
  {:else}
    <form method="POST" action="/auth?/signIn" use:signInEnhance>
      <h3
        class="font-heading mb-4 text-center text-3xl font-semibold text-gray-900">
        Sign In to Your Account
      </h3>
      {#if $signInMessage}
        <div class="message" class:text-red-600={$page.status > 200}>
          {$signInMessage}
        </div>
      {:else}
        <p class="mb-6 text-lg text-gray-500">
          If you have an existing account, enter your email and password below.
        </p>
      {/if}

      <!-- <Form.Field form={signInForm} name="token">
        <Form.Control let:attrs>
          <input {...attrs} type="hidden" bind:value={$signInFormData.token} />
        </Form.Control>
      </Form.Field> -->
      <Form.Field form={signInForm} name="email">
        <Form.Control let:attrs>
          <Form.Label>Email</Form.Label>
          <input {...attrs} bind:value={$signInFormData.email} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field form={signInForm} name="password">
        <Form.Control let:attrs>
          <Form.Label>Password</Form.Label>
          <!-- <ShowHideIcon bind:reveal> -->
          {#if reveal}
            <input
              {...attrs}
              type="text"
              bind:value={$signInFormData.password} />
          {:else}
            <input
              {...attrs}
              type="password"
              bind:value={$signInFormData.password} />
          {/if}
          <!-- </ShowHideIcon> -->
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <button type="submit" class="button">Sign In</button>
      <!-- <AppleButton /> -->
      <div class="text-center text-sm font-medium text-gray-900">
        <span>Don't have an account?&nbsp;&nbsp;</span>
        <button
          type="button"
          on:click={() => {
            state = 'signUp';
          }}
          class="text-orange-900 hover:text-orange-700">
          Sign Up
        </button>
      </div>
      <div class="text-center text-sm font-medium text-gray-900">
        <button
          type="button"
          on:click={() => {
            state = 'forgot';
          }}
          class="mt-4 hover:text-gray-700">
          Forgot your password?
        </button>
      </div>
    </form>
  {/if}
{:else if state === 'signUp'}
  <form method="POST" action="/auth?/signUp" use:signUpEnhance>
    <h3
      class="font-heading mb-4 text-center text-3xl font-semibold text-gray-900">
      Create an Account
    </h3>
    <p class="mb-6 text-lg text-gray-500">
      Welcome! To create an account, please enter your email and choose a
      password below.
    </p>
    <!-- <Form.Field form={signUpForm} name="token">
      <Form.Control let:attrs>
        <input {...attrs} type="hidden" bind:value={$signUpFormData.token} />
      </Form.Control>
    </Form.Field> -->
    <Form.Field form={signUpForm} name="fname">
      <Form.Control let:attrs>
        <Form.Label>First Name</Form.Label>
        <input {...attrs} bind:value={$signUpFormData.fname} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={signUpForm} name="lname">
      <Form.Control let:attrs>
        <Form.Label>Last Name</Form.Label>
        <input {...attrs} bind:value={$signUpFormData.lname} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={signUpForm} name="email">
      <Form.Control let:attrs>
        <Form.Label>Email</Form.Label>
        <input {...attrs} bind:value={$signUpFormData.email} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={signUpForm} name="password">
      <Form.Control let:attrs>
        <Form.Label>Password</Form.Label>
        <!-- <ShowHideIcon bind:reveal> -->
        {#if reveal}
          <input {...attrs} type="text" bind:value={$signUpFormData.password} />
        {:else}
          <input
            {...attrs}
            type="password"
            bind:value={$signUpFormData.password} />
        {/if}
        <!-- </ShowHideIcon> -->
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <button type="submit" class="button">Create Account</button>
    <!-- <AppleButton /> -->
    <div class="text-center text-sm font-medium text-gray-900">
      <span>Already have an account?&nbsp;&nbsp;</span>
      <button
        type="button"
        on:click={() => {
          state = 'signIn';
        }}
        class="text-orange-900 hover:text-orange-700">
        Sign In
      </button>
    </div>
  </form>
{:else if state === 'forgot'}
  <form method="POST" action="/auth?/forgot" use:forgotEnhance>
    <h3
      class="font-heading mb-4 text-center text-3xl font-semibold text-gray-900">
      Reset Your Password
    </h3>
    <p class="mb-6 text-lg text-gray-500">
      Enter your email address to receive an email with a link to change your
      password.
    </p>
    <!-- <Form.Field form={forgotForm} name="token">
      <Form.Control let:attrs>
        <input {...attrs} type="hidden" bind:value={$forgotFormData.token} />
      </Form.Control>
    </Form.Field> -->
    <Form.Field form={forgotForm} name="email">
      <Form.Control let:attrs>
        <Form.Label>Email</Form.Label>
        <input {...attrs} bind:value={$forgotFormData.email} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <button type="submit" class="button">Request Reset Code</button>
    <div class="pt-6 text-center text-sm font-medium text-gray-900">
      <button
        type="button"
        on:click={() => {
          state = 'signIn';
        }}
        class="text-gray-900 hover:text-orange-700">
        &larr;&nbsp; Sign In Instead
      </button>
    </div>
  </form>
{:else if state === 'reset'}
  <form method="POST" action="/auth?/reset" use:resetEnhance>
    <h3
      class="font-heading mb-4 text-center text-3xl font-semibold text-gray-900">
      Choose a New Password
    </h3>
    <!-- <Form.Field form={resetForm} name="token">
      <Form.Control let:attrs>
        <input {...attrs} type="hidden" bind:value={$resetFormData.token} />
      </Form.Control>
    </Form.Field> -->
    <Form.Field form={resetForm} name="code">
      <Form.Control let:attrs>
        <input {...attrs} type="hidden" bind:value={$resetFormData.code} />
      </Form.Control>
    </Form.Field>
    <Form.Field form={resetForm} name="password">
      <Form.Control let:attrs>
        <Form.Label>Password</Form.Label>
        <!-- <ShowHideIcon bind:reveal> -->
        {#if reveal}
          <input {...attrs} type="text" bind:value={$resetFormData.password} />
        {:else}
          <input
            {...attrs}
            type="password"
            bind:value={$resetFormData.password} />
        {/if}
        <!-- </ShowHideIcon> -->
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <button type="submit" class="button">Request Reset Code</button>
    <slot name="footer" />
  </form>
{/if}
