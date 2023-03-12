<script lang="ts">
  import anime from "animejs";

  export let show = false;
  const animation = (el: HTMLDivElement, _: boolean) => {
    return {
      update(props: boolean) {
        props
          ? anime({
              targets: el,
              backdropFilter: "blur(20px)",
              duration: 650,
              easing: "easeInOutQuad",
              begin: () => {
                el.style.display = "block";
              },
            })
          : anime({
              targets: el,
              backdropFilter: ["blur(20px)", "blur(0px)"],
              duration: 400,
              easing: "easeInOutQuad",
              complete: () => {
                el.style.display = "none";
              },
            });
      },
    };
  };
</script>

<div
  use:animation={show}
  id="backdrop_blur"
  class="h-screen w-screen fixed top-0 left-0 z-30 bg-white/20 hidden"
/>
