<script lang="ts">
  import type { HeroProps } from "$lib/@types/home.types";
  import SanityImage from "$components/sanity-image.svelte";
  import { navbarHeight } from "$lib/stores/global.store";
  import { Motion, type Variant, type Variants } from "svelte-motion";
  import { EASE } from "$lib/helpers/constants";

  export let props: HeroProps;
  const { highlights } = props;

  const item: Variants = {
    hidden: { y: 0 },

    show: (index: number) => ({
      y: "100%",
      transition: { ease: EASE, duration: 0.7, delay: index * 0.1 },
    }),
  };
</script>

<section
  style="height: calc(100vh - {$navbarHeight}px);"
  class="w-full relative overflow-hidden"
>
  <!-- Background Image -->
  <figure class="h-full w-full">
    <SanityImage
      class="w-full h-full object-cover"
      maxWidth={1500}
      image={highlights[0].image}
      alt={highlights[0].image?.alt}
    />
  </figure>

  <!-- Text -->
  <Motion let:motion initial={{}} animate={{}}>
    <div use:motion class="">Test</div>
  </Motion>

  <!-- Backdrop -->
  <div
    class="absolute bottom-0 left-0 w-full h-full | grid grid-cols-6 | pointer-events-none"
  >
    {#each Array.from({ length: 6 }) as e, index}
      <Motion
        custom={index}
        let:motion
        variants={item}
        initial="hidden"
        animate="show"
      >
        <div use:motion class="col-span-1 bg-alabaster" />
      </Motion>
    {/each}
  </div>
</section>
