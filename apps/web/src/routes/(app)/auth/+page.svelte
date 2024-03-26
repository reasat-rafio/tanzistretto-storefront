<script lang="ts">
  import { page } from '$app/stores';
  import {
    forgotPostReq,
    loginPostReq,
    registerPostReq,
    resetPostReq,
  } from '$lib/utils/validators';
  import { zod } from 'sveltekit-superforms/adapters';
  import { superForm } from 'sveltekit-superforms/client';
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';
  // import { MEDUSA_BACKEND_URL } from '$env/static/private';

  export let data: PageData;
  $: ({ code, rurl } = data);

  const {
    form: loginForm,
    errors: loginErrors,
    message: loginMessage,
    enhance: loginEnhance,
  } = superForm(data.loginForm, {
    validators: zod(loginPostReq),
    invalidateAll: true,
    taintedMessage: null,
  });

  const {
    form: registerForm,
    errors: registerErrors,
    message: registerMessage,
    enhance: registerEnhance,
  } = superForm(data.registerForm, {
    validators: zod(registerPostReq),
    invalidateAll: true,
    taintedMessage: null,
  });

  const {
    form: forgotForm,
    errors: forgotErrors,
    message: forgotMessage,
    enhance: forgotEnhance,
  } = superForm(data.forgotForm, {
    validators: zod(forgotPostReq),
    invalidateAll: true,
    taintedMessage: null,
  });

  const {
    form: resetForm,
    errors: resetErrors,
    message: resetMessage,
    enhance: resetEnhance,
  } = superForm(data.resetForm, {
    validators: zod(resetPostReq),
    invalidateAll: true,
    taintedMessage: null,
  });

  let state = code ? 'reset' : 'signin';

  $resetForm.code = code;
  $loginForm.rurl = rurl || '';
  $registerForm.rurl = rurl || '';
  $forgotForm.rurl = rurl || '';
  $resetForm.rurl = rurl || '';

  const logout = async () => {
    const formData = new FormData(); // The POST request fails without a body
    const res = await fetch('/auth?/logout', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) goto('/auth');
  };
</script>

<button type="button" on:click={logout}>Sign Out</button>

<a
  type="button"
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
</a>

{#if state === 'signin'}
  <h3
    class="font-heading mb-4 text-center text-3xl font-semibold text-gray-900">
    Sign In to Your Account
  </h3>
  <p class="mb-10 text-lg text-gray-500">
    If you have an existing account, enter your email and password below.
  </p>
  <form action="?/login" method="POST" use:loginEnhance>
    <input type="hidden" name="rurl" value={$loginForm.rurl} />
    <!-- <input type="hidden" name="token" bind:value={$loginForm.token} /> -->
    <label class="label">
      <div class="label-text">Email</div>
      <input
        name="email"
        type="email"
        autocomplete="email"
        class="input"
        aria-invalid={$loginErrors.email ? 'true' : undefined}
        bind:value={$loginForm.email} />
      {#if $loginErrors.email}<span class="invalid">
          {$loginErrors.email}
        </span>{/if}
    </label>
    <label class="label">
      <div class="label-text">Password</div>
      <input
        name="password"
        type="password"
        autocomplete="current-password"
        class="input"
        aria-invalid={$loginErrors.password ? 'true' : undefined}
        bind:value={$loginForm.password} />
      {#if $loginErrors.password}<span class="invalid">
          {$loginErrors.password}
        </span>{/if}
    </label>
    {#if $loginMessage}<div class="mt-2 text-sm text-red-600">
        {$loginMessage}
      </div>{/if}
    <button type="submit" class="button">Login</button>
    <!-- <SocialProviders /> -->
    <div class="pt-6 text-center text-sm font-medium">
      <span>Don't have an account?&nbsp;&nbsp;</span>
      <button
        type="button"
        on:click={() => {
          state = 'signup';
        }}
        class="text-orange-900 hover:text-orange-700">
        Sign Up
      </button>
    </div>
    <div class="text-center text-sm font-medium">
      <button
        type="button"
        on:click={() => {
          state = 'forgot';
        }}
        class="mt-4 text-gray-900 hover:text-gray-700">
        Forgot your password?
      </button>
    </div>
  </form>
{:else if state === 'signup'}
  <h3
    class="font-heading mb-4 text-center text-3xl font-semibold text-gray-900">
    Create an Account
  </h3>
  <p class="mb-10 text-lg text-gray-500">
    Welcome! To create an account, please enter your email and choose a password
    below.
  </p>
  <form action="?/register" method="POST" use:registerEnhance>
    <input type="hidden" name="rurl" value={$registerForm.rurl} />
    <!-- <input type="hidden" name="token" bind:value={$registerForm.token} /> -->
    <label class="label">
      <div class="label-text">First Name</div>
      <input
        name="firstName"
        type="text"
        autocomplete="given-name"
        class="input"
        aria-invalid={$registerErrors.firstName ? 'true' : undefined}
        bind:value={$registerForm.firstName} />
      {#if $registerErrors.firstName}<span class="invalid">
          {$registerErrors.firstName}
        </span>{/if}
    </label>
    <label class="label">
      <div class="label-text">Last Name</div>
      <input
        name="lastName"
        type="text"
        autocomplete="family-name"
        class="input"
        aria-invalid={$registerErrors.lastName ? 'true' : undefined}
        bind:value={$registerForm.lastName} />
      {#if $registerErrors.lastName}<span class="invalid">
          {$registerErrors.lastName}
        </span>{/if}
    </label>
    <label class="label">
      <div class="label-text">Email</div>
      <input
        name="email"
        type="email"
        autocomplete="email"
        class="input"
        aria-invalid={$registerErrors.email ? 'true' : undefined}
        bind:value={$registerForm.email} />
      {#if $registerErrors.email}<span class="invalid">
          {$registerErrors.email}
        </span>{/if}
    </label>
    <label class="label">
      <div class="label-text">Password</div>
      <input
        name="password"
        type="password"
        autocomplete="new-password"
        class="input"
        aria-invalid={$registerErrors.password ? 'true' : undefined}
        bind:value={$registerForm.password} />
      {#if $registerErrors.password}<span class="invalid">
          {$registerErrors.password}
        </span>{/if}
    </label>
    <label class="label">
      <div class="label-text">Confirm Password</div>
      <input
        name="passwordConfirm"
        type="password"
        autocomplete="new-password"
        class="input"
        aria-invalid={$registerErrors.passwordConfirm ? 'true' : undefined}
        bind:value={$registerForm.passwordConfirm} />
      {#if $registerErrors.passwordConfirm}<span class="invalid">
          {$registerErrors.passwordConfirm}
        </span>{/if}
    </label>
    {#if $registerMessage}<div class="mt-2 text-sm text-red-600">
        {$registerMessage}
      </div>{/if}
    <button type="submit" class="button">Create Account</button>
    <!-- <SocialProviders /> -->
    <div class="pt-6 text-center text-sm font-medium">
      <span>Already have an account?&nbsp;&nbsp;</span>
      <button
        type="button"
        on:click={() => {
          state = 'signin';
        }}
        class="text-orange-900 hover:text-orange-700">
        Sign In
      </button>
    </div>
  </form>
{:else if state === 'forgot'}
  {#if $forgotMessage}
    <div class="mt-2 text-sm" class:text-red-600={$page.status > 200}>
      {$forgotMessage}
    </div>
  {:else}
    <p class="my-4 text-center font-medium">Enter your email address</p>
    <form action="?/forgot" method="POST" use:forgotEnhance>
      <input type="hidden" name="rurl" value={$forgotForm.rurl} />
      <!-- <input type="hidden" name="token" bind:value={$forgotForm.token} /> -->
      <label class="label">
        <div class="label-text">Email</div>
        <input
          name="email"
          type="email"
          autocomplete="email"
          class="input"
          aria-invalid={$forgotErrors.email ? 'true' : undefined}
          bind:value={$forgotForm.email} />
        {#if $forgotErrors.email}<span class="invalid">
            {$forgotErrors.email}
          </span>{/if}
      </label>
      <button type="submit" class="button">Request Reset Code</button>
    </form>
  {/if}
{:else if state === 'reset'}
  <p class="my-4 text-center font-medium">Choose a new password</p>
  <form action="?/reset" method="POST" use:resetEnhance>
    <input type="hidden" name="rurl" value={$resetForm.rurl} />
    <!-- <input type="hidden" name="token" bind:value={$resetForm.token} /> -->
    <input type="hidden" name="code" bind:value={$resetForm.code} />
    <label class="label">
      <div class="label-text">Email</div>
      <input
        name="email"
        type="email"
        autocomplete="email"
        class="input"
        aria-invalid={$resetErrors.email ? 'true' : undefined}
        bind:value={$resetForm.email} />
      {#if $resetErrors.email}<span class="invalid">
          {$resetErrors.email}
        </span>{/if}
    </label>
    <label class="label">
      <div class="label-text">Password</div>
      <input
        name="password"
        type="password"
        autocomplete="new-password"
        class="input"
        aria-invalid={$resetErrors.password ? 'true' : undefined}
        bind:value={$resetForm.password} />
      {#if $resetErrors.password}<span class="invalid">
          {$resetErrors.password}
        </span>{/if}
    </label>
    <label class="label">
      <div class="label-text">Confirm Password</div>
      <input
        name="passwordConfirm"
        type="password"
        autocomplete="new-password"
        class="input"
        aria-invalid={$resetErrors.passwordConfirm ? 'true' : undefined}
        bind:value={$resetForm.passwordConfirm} />
      {#if $resetErrors.passwordConfirm}<span class="invalid">
          {$resetErrors.passwordConfirm}
        </span>{/if}
    </label>
    {#if $resetMessage}<div class="mt-2 text-sm text-red-600">
        {$resetMessage}
      </div>{/if}
    <button type="submit" class="button">Save New Password</button>
  </form>
{/if}
