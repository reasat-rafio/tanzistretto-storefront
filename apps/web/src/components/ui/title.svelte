<script lang="ts">
  import anime from "animejs";
  import { onMount } from "svelte";

  type TextProps = string[];
  export let texts: TextProps;

  onMount(() => {
    anime({
      targets: "#page_title",
      filter: ["blur(100px)", "blur(0px)"],
      opacity: [0.3, 1],
      duration: 500,
      easing: "cubicBezier(0.445, 0.05, 0.55, 0.95)",
    });
  });
</script>

<h1
  id="page_title"
  class="uppercase lg:text-heading-1 sm:text-7xl text-heading-1-sm flex flex-col leading-none text-primary w-fit"
>
  {#if texts.length === 2}
    <span class="sm:ml-[20%] sm:text-left text-center">{texts[0]}</span>
    <span class="font-title">{texts[1]}</span>
  {/if}
</h1>
