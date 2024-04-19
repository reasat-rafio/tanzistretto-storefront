<script lang="ts">
  import { authStore } from '$lib/stores/auth-store';
  import AuthView from './auth-view/auth-view.svelte';
  import ProfileView from './profile-view/profile-view.svelte';

  $: ({ user } = $authStore);
</script>

<div class="space-y-2">
  {#if user}
    <ProfileView />
  {:else}
    <AuthView />
  {/if}
</div>
