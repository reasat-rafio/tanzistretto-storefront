<script lang="ts">
  import type { HeroProps } from "$lib/@types/home.types";
  import SanityImage from "$components/sanity-image.svelte";
  import { navbarHeight } from "$lib/stores/global.store";
  import anime from "animejs";
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import { EffectFade } from "swiper";
  import "swiper/css";
  import "swiper/css/effect-fade";
  import { onMount } from "svelte";
  import {
    backdropBottomUpAnime,
    headerBottomUpAndBlurAnim,
  } from "./animations";

  export let props: HeroProps;
  const { highlights } = props;
  onMount(() => {
    const onPageLoadAnim = anime.timeline({
      duration: 1000,
      easing: "easeInOutQuad",
    });

    onPageLoadAnim.add(headerBottomUpAndBlurAnim).add(backdropBottomUpAnime);
  });

  // onMount(() => {});
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
    on:slideChange={(swiper) => console.log(swiper)}
  >
    {#each highlights as { image, title, textColor, _key } (_key)}
      <SwiperSlide let:data={{ isActive }}>
        <figure class="h-full w-full">
          <SanityImage
            class="w-full h-full object-cover"
            maxWidth={1500}
            {image}
            alt={image?.alt}
          />
        </figure>
      </SwiperSlide>
    {/each}
  </Swiper>

  <div
    class="absolute h-full w-full top-0 mx-auto | flex flex-col justify-center"
  >
    <header id="hero_header" class="container mx-auto relative z-20">
      <h1 class="flex flex-col | text-7xl | uppercase w-fit">
        <span class="ml-10 | font-light drop-shadow">Passion</span>
        <span class="font-title font-thin drop-shadow">For Quality</span>
      </h1>
    </header>
  </div>

  <!-- Backdrop -->
  <div
    id="hero_backdrop"
    class="absolute bottom-0 left-0 w-full h-full | pointer-events-none z-10 bg-alabaster"
  />
</section>
