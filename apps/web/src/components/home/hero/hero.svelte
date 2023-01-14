<script lang="ts">
  import type { HeroProps } from "$lib/@types/home.types";
  import SanityImage from "$components/sanity-image.svelte";
  import { navbarHeight } from "$lib/stores/global.store";
  import { Motion, type Variant, type Variants } from "svelte-motion";
  import { EASE } from "$lib/helpers/constants";
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import { EffectFade } from "swiper";
  import "swiper/css";
  import "swiper/css/effect-fade";

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
  <Swiper
    class="h-full w-full"
    modules={[EffectFade]}
    effect="fade"
    slidesPerView={1}
    speed={700}
    on:slideChange={() => console.log("slide change")}
    on:swiper={(e) => console.log(e)}
  >
    {#each highlights as { image, title, textColor, _key } (_key)}
      <SwiperSlide>
        <figure class="h-full w-full">
          <SanityImage
            class="w-full h-full object-cover"
            maxWidth={1500}
            {image}
            alt={image?.alt}
          />
        </figure>
        <Motion let:motion initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div
            use:motion
            class="absolute h-full w-full top-0 mx-auto | flex flex-col justify-center"
            class:text-secondary={textColor === "dark"}
            class:text-alabaster={textColor === "light"}
          >
            <header class="container mx-auto">
              <h1 class="flex flex-col | text-7xl | uppercase">
                <span class="ml-10 | font-light drop-shadow">{title[0]}</span>
                <span class="font-title font-thin drop-shadow">{title[1]}</span>
              </h1>
            </header>
          </div>
        </Motion>
      </SwiperSlide>
    {/each}
  </Swiper>

  <!-- Backdrop -->
  <div
    class="absolute bottom-0 left-0 w-full h-full | grid grid-cols-6 | pointer-events-none z-10"
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
