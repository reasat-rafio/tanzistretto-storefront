<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { navbarHeight } from "$lib/stores/global.store";
  import type { User } from "@supabase/supabase-js";
  import { NavigationData } from "./data";
  export let user: User | undefined;

  $: activeNavigation = $page.url.searchParams.get("render");
  $: avater = user?.user_metadata?.avatar_url;

  const selectNavigationAction = (slug: string) => {
    const url = new URL($page.url);
    url?.searchParams?.set("render", slug);
    goto(url.toString().replace(/%2C/g, ","), {
      replaceState: true,
      noScroll: true,
    });
  };
</script>

<nav
  style="height: calc(100vh - {$navbarHeight}px);"
  class="{$$props.class} h-screen p-5 | flex flex-col justify-center items-center | space-y-10"
>
  <div class="avatar placeholder">
    <div class="bg-neutral-focus text-neutral-content rounded-full w-24">
      <img
        class="h-full w-full object-cover"
        src={avater}
        alt="img"
        referrerpolicy="no-referrer"
      />
    </div>
  </div>

  <div class="text-xl space-y-3 font-medium | flex flex-col">
    {#each NavigationData as { title, url }}
      <button
        on:click={() => selectNavigationAction(url)}
        class="text-center | p-2 | hover:bg-secondary hover:text-white rounded | transition-colors duration-500 | cursor-pointer | {activeNavigation?.trim() ===
          url.trim() && 'bg-secondary text-white'}"
        >{title}
      </button>
    {/each}
  </div>
</nav>
