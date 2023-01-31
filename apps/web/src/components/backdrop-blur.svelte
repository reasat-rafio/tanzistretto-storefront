<script lang="ts">
  import { browser } from "$app/environment";
  import anime from "animejs";

  export let show = false;
  let sidebarEl: HTMLDivElement;

  $: if (browser)
    show
      ? anime({
          targets: "#backdrop_blur",
          backdropFilter: "blur(20px)",
          duration: 650,
          easing: "easeInOutQuad",
          begin: () => {
            sidebarEl.style.display = "block";
          },
        })
      : anime({
          targets: "#backdrop_blur",
          backdropFilter: ["blur(20px)", "blur(0px)"],
          duration: 400,
          easing: "easeInOutQuad",
          complete: () => {
            sidebarEl.style.display = "none";
          },
        });
</script>

<div
  bind:this={sidebarEl}
  id="backdrop_blur"
  class="h-screen w-screen fixed top-0 left-0 z-30 bg-white/20 hidden"
/>
