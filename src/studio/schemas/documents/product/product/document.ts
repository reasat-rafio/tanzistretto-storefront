import { orderRankField } from '@sanity/orderable-document-list';
import { defineType } from 'sanity';
import { IoBagHandle } from 'react-icons/io5';
import { alt } from '$studio/lib/alt';

const product = defineType({
  name: 'product',
  icon: IoBagHandle,
  type: 'document',
  fields: [
    orderRankField({ type: 'product' }),

    {
      name: 'seo',
      type: 'seo',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'images',
      type: 'array',
      of: [{ type: 'image', fields: [alt()] }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'availableSizes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'size' }] }],
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'variants',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'variant',
          fields: [
            {
              name: 'name',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
});

export default product;
