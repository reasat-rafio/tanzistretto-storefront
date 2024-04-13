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
  style?: React.CSSProperties;
}

const SanityImage: React.FC<SanityImageProps> = ({
  src,
  className,
  sizes = "(max-width: 800px) 100vw, 800px",
  style = { width: "100%", height: "100%" },
}) => {
  const imageProps = useNextSanityImage(sanityClient, src);

  return (
    <Image
      {...imageProps}
      className={className}
      style={style}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={(src.asset as SanityAsset).metadata.lqip}
      alt={src?.alt ?? "Image"}
    />
  );
};

export default SanityImage;
