<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import { supabaseClient } from "$lib/supabase";
  // import type { PageData } from "./$types";

  // export let data: PageData;
  export let data: any;

  const submitLogout: SubmitFunction = async ({ cancel }) => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
    }
    cancel();
  };
</script>

<main>
  <h1 class="text-9xl text-green-700">Tanzistretto!</h1>

  {#each data.site.nav.menu as menu}
    <li>{menu.title}</li>
  {/each}

  {#if data.session}
    <p>Welcome, {data.session.user.email}</p>
    <form action="/auth/logout" method="POST" use:enhance={submitLogout}>
      <button type="submit" class="btn btn-primary">Logout</button>
    </form>
  {:else}
    <p>No one is autheticated!</p>
    <div class="auth-buttons">
      <a href="/auth/login" class="btn btn-primary">Login</a>
      <a href="/auth/register" class="btn btn-secondary">Register</a>
    </div>
  {/if}
</main>
