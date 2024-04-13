"use client";

import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import sanityClient from "@/lib/sanity/client";
import { SanityImageWithAlt } from "@/types/common";
import { SanityAsset } from "@sanity/image-url/lib/types/types";

interface SanityImageProps {
  src: SanityImageWithAlt;
  sizes?: string;
  className?: string;
}

const SanityImage: React.FC<SanityImageProps> = ({
  src,
  sizes = "(max-width: 800px) 100vw, 800px",
  className,
}) => {
  const imageProps = useNextSanityImage(sanityClient, src);

  return (
    <Image
      {...imageProps}
      className={className}
      style={{ width: "100%", height: "auto" }}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={(src.asset as SanityAsset).metadata.lqip}
      alt={src?.alt ?? "Image"}
    />
  );
};

export default SanityImage;
