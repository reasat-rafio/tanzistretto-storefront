import { HeroProps } from "@/types/home";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import SanityImage from "@/components/common/sanity-image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SanityImageWithAlt } from "@/types/common";

const Hero: React.FC<HeroProps> = ({ banners, _type }) => {
  return (
    <section key={_type}>
      <div className="container pb-6">
        <Carousel className="w-full">
          <CarouselContent>
            {banners.map(({ image, ...rest }) => (
              <CarouselItem key={rest._key}>
                <div className="bg-muted relative h-[20rem] overflow-hidden rounded-3xl md:h-[30rem] lg:h-[37.5rem]">
                  <BannerImage image={image} />
                  <BannerContent {...rest} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;

const BannerImage: React.FC<{ image: SanityImageWithAlt }> = ({ image }) => {
  return (
    <figure className="absolute inset-0 h-full w-full">
      <SanityImage
        className="h-full w-full object-cover"
        sizes="(min-width: 1024px) 80vw, 100vw"
        src={image}
      />
    </figure>
  );
};

const BannerContent: React.FC<Omit<HeroProps["banners"][0], "image">> = ({
  title,
  link,
}) => {
  return (
    <div className="text-primary-foreground relative z-10 mt-auto flex h-full w-fit flex-col justify-end gap-y-4 p-5 md:p-10">
      <h2 className="whitespace-pre text-xl font-semibold drop-shadow-2xl sm:text-3xl lg:text-5xl">
        {title}
      </h2>

      <div>
        <Button asChild className="rounded-full" variant="hero" size="lg">
          <Link
            href={
              link.type === "internal"
                ? (link.internalLink as string)
                : (link.externalLink as string)
            }
          >
            {link.title}
          </Link>
        </Button>
      </div>
    </div>
  );
};
