import { sanityClient } from '$lib/sanity/sanity-client';
import type { SanityReference } from '@sanity/image-url/lib/types/types';
import { Stack } from '@sanity/ui';
import groq from 'groq';
import React, { useEffect, useMemo, useState } from 'react';
import type { PreviewProps } from 'sanity';

type CastPreviewProps = PreviewProps & {
  variants?: any[];
  defaultColor: string;
};

function ProductPreview(p: PreviewProps) {
  const props = p as CastPreviewProps;
  const [colorNames, setColorNames] = useState<string[]>([props?.defaultColor]);

  const defaultColors = useMemo(
    () => props.defaultColor,
    [props?.defaultColor],
  );

  const VariantColorsRef = useMemo(
    () =>
      props?.variants?.map(
        ({ color }: { color: SanityReference }) => color._ref,
      ),
    [props?.variants],
  );

  async function getData(ref: string[]) {
    const data = await sanityClient.fetch(
      groq`*[_type == "colour" && _id in $ref][]{name}`,
      { ref: ref },
    );

    return data;
  }

  useEffect(() => {
    (async () => {
      if (VariantColorsRef) {
        try {
          const colors: { name: string }[] = await getData(VariantColorsRef);
          setColorNames([defaultColors, ...colors.map(({ name }) => name)]);
        } catch (err) {
          console.error(err);
        }
      } else {
        setColorNames([defaultColors]);
      }
    })();
  }, [props, VariantColorsRef]);

  return (
    <Stack space={3}>
      {props.renderDefault({ ...props, subtitle: colorNames.join(',') })}
    </Stack>
  );
}

export default ProductPreview;
