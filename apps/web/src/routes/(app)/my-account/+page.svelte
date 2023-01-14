<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import AccountSettings from "../../../components/my-account/account-settings.svelte";
  import SignOut from "./components/sign-out.svelte";
  import YourOrders from "$components/my-account/your-orders.svelte";
  export let data: PageData;

  $: renderSection = $page.url.searchParams.get("render");
</script>

<div class="min-h-screen ">
  {#if renderSection === "your-orders"}
    <YourOrders />
  {:else if renderSection === "account-settings"}
    <AccountSettings />
  {:else if renderSection === "sign-out"}
    <SignOut />
  {:else}
    <YourOrders />
  {/if}
</div>
