<script lang="ts">
  import type { HeroProps } from '$lib/types/landing.types';
  import * as Carousel from '$lib/components/ui/carousel/index.js';
  import SanityImage from '$lib/sanity/sanity-image/sanity-image.svelte';
  import { imgBuilder } from '$lib/sanity/sanity-client';
  import Button from '$lib/components/ui/button/button.svelte';

  export let props: HeroProps;
  $: ({ banners } = props);
</script>

<section>
  <div class="container pb-6">
    <Carousel.Root class="w-full ">
      <Carousel.Content>
        {#each banners as { _key, title, link, subtitle, image }, i (_key)}
          <Carousel.Item>
            <div
              class="bg-muted relative h-[20rem] overflow-hidden rounded-3xl md:h-[30rem] lg:h-[37.5rem]">
              <div class="absolute inset-0 h-full w-full">
                <SanityImage
                  lqip
                  class="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  src={image}
                  alt={image.alt}
                  imageUrlBuilder={imgBuilder} />
              </div>

              <div
                class="text-primary-foreground relative z-10 mt-auto flex h-full w-fit flex-col justify-end gap-y-4 p-5 md:p-10">
                <h2
                  class="whitespace-pre text-xl font-semibold drop-shadow-2xl sm:text-3xl lg:text-5xl">
                  {title}
                </h2>

                <div>
                  <Button
                    class="rounded-full"
                    variant="hero"
                    size="lg"
                    href={link.type === 'internal'
                      ? link.internalLink
                      : link.externalLink}>
                    {link.title}
                  </Button>
                </div>
              </div>
            </div>
          </Carousel.Item>
        {/each}
      </Carousel.Content>
      <!-- <Carousel.Previous class="hidden lg:flex" />
      <Carousel.Next class="hidden lg:flex" /> -->
    </Carousel.Root>
  </div>
</section>
