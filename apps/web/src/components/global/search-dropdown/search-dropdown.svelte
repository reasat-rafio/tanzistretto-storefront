<script lang="ts">
  import { browser } from "$app/environment";
  import BackdropBlur from "$components/backdrop-blur.svelte";
  import { showQuickSearchDropdown } from "$lib/stores/global.store";
  import { clickoutside } from "@svelte-put/clickoutside";
  import anime from "animejs";

  let searchDropdownEl: HTMLDivElement;
  const closeQuickSearchAction = () => ($showQuickSearchDropdown = false);
  $: if (browser) {
    $showQuickSearchDropdown
      ? anime({
          targets: "#seach_dropdown",
          translateY: "0%",
          duration: 650,
          easing: "easeInOutQuad",
          begin: () => (searchDropdownEl.style.display = "block"),
        })
      : anime({
          targets: "#seach_dropdown",
          translateY: "-100%",
          duration: 400,
          easing: "easeInOutQuad",
          complete: () => (searchDropdownEl.style.display = "none"),
        });
  }
</script>

<BackdropBlur show={$showQuickSearchDropdown} />
<div
  id="seach_dropdown"
  bind:this={searchDropdownEl}
  use:clickoutside
  on:clickoutside={closeQuickSearchAction}
  class="z-40 fixed right-0 top-0 | w-screen h-[50vh] | px-5 pt-5 | bg-white shadow hidden"
/>
