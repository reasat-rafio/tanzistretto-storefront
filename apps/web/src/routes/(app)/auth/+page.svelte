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
</script>

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
