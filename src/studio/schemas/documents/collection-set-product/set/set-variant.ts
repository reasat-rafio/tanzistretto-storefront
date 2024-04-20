import { alt } from '$studio/lib/alt';
import { defineField } from 'sanity';

const setVariant = defineField({
  name: 'setVariant',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'outOfStock',
      type: 'boolean',
      initialValue: false,
      description: 'If this is empty it will use the stock from the set.',
    },
    { name: 'color', type: 'reference', to: [{ type: 'colour' }] },
    {
      name: 'images',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [alt()],
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      description:
        'The price of this variant. If this is empty it will use the price from the set.',
    },

    {
      name: 'products',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [
        {
          type: 'object',
          name: 'product',
          fields: [
            { name: 'product', type: 'reference', to: [{ type: 'product' }] },
            { name: 'color', type: 'reference', to: [{ type: 'colour' }] },
          ],
          preview: {
            select: {
              title: 'product.title',
              subtitle: 'color.name',
              media: 'product.defaultProductVariant.images[0]',
            },
            prepare: (props) => ({
              ...props,
              subtitle: `variant - ${props.subtitle}`,
            }),
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'color.name',
      media: 'images[0].asset',
    },
    prepare: (props) => ({
      ...props,
      subtitle: `variant - ${props.subtitle}`,
    }),
  },
});

export default setVariant;
