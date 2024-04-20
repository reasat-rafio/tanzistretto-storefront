import { alt } from '$studio/lib/alt';
import { defineField } from 'sanity';

const productVariant = defineField({
  name: 'productVariant',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    { name: 'color', type: 'reference', to: [{ type: 'colour' }] },
    {
      name: 'sizes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'size' }] }],
      validation: (rule) => rule.unique(),
      description: 'If this is empty it will use the sizes from the product.',
    },
    {
      name: 'price',
      type: 'number',
      description:
        'The price of this variant. If this is empty it will use the price from the product.',
    },
    {
      name: 'outOfStock',
      type: 'boolean',
      initialValue: false,
      description: 'If this is empty it will use the stock from the product.',
    },
    {
      title: 'SKU',
      name: 'sku',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images',
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'color.name',
      media: 'images[0].asset',
    },
  },
});

export default productVariant;
