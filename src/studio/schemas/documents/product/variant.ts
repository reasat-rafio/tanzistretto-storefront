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
    },
    {
      name: 'price',
      type: 'number',
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
});

export default productVariant;
