import { alt } from '$studio/lib/alt';
import { orderRankField } from '@sanity/orderable-document-list';
import { MdLocalDrink } from 'react-icons/md';
import { defineType } from 'sanity';

const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: MdLocalDrink,
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'variants',
      title: 'Variants',
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'categories',
      title: 'Categories',
    },
  ],
  fields: [
    orderRankField({ type: 'product' }),
    { name: 'seo', type: 'seo', group: 'seo' },
    {
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
        group: 'content',
      },
    },
    {
      title: 'Main image',
      name: 'mainImage',
      type: 'image',
      options: { hotspot: true },
      fields: [alt()],
      validation: (rule) => rule.required(),
      group: 'content',
    },
    {
      name: 'subtitle',
      type: 'string',
      group: 'content',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'content',
    },
    {
      name: 'sizes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'size' }] }],
      group: 'variants',
      validation: (rule) => rule.required(),
    },
    {
      title: 'Default variant',
      name: 'defaultProductVariant',
      type: 'productVariant',
      validation: (rule) => rule.required(),
      group: 'variants',
    },
    {
      name: 'variants',
      type: 'array',
      group: 'variants',
      of: [
        {
          title: 'Variant',
          type: 'productVariant',
        },
      ],
    },

    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'categories',
      validation: (rule) => rule.required(),
      of: [
        {
          type: 'reference',
          to: { type: 'category' },
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug',
      media: 'defaultProductVariant.images[0]',
    },
  },
});

export default product;
