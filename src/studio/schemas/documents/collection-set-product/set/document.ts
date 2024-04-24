import { alt } from '$studio/lib/alt';
import { orderRankField } from '@sanity/orderable-document-list';
// import { toggleMode } from 'mode-watcher';
import { BsCollection } from 'react-icons/bs';
import { defineType } from 'sanity';

const set = defineType({
  name: 'set',
  title: 'Set',
  type: 'document',
  icon: BsCollection,
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'products',
      title: 'Products',
    },
    {
      name: 'categories',
      title: 'Categories',
    },
  ],
  fields: [
    orderRankField({ type: 'set' }),
    {
      name: 'seo',
      type: 'seo',
      group: 'seo',
      options: {
        collapsable: true,
        collapsed: true,
      },
    },
    {
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'outOfStock',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    },
    {
      name: 'isNew',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'price',
      type: 'number',
      validation: (rule) => rule.required(),
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'subtitle',
      type: 'string',
    },
    {
      name: 'categories',
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

    {
      name: 'sizes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'size' }] }],
      validation: (rule) => rule.required().unique(),
    },
    {
      name: 'materials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'material' }] }],
      validation: (rule) => rule.unique(),
    },
    {
      name: 'occasions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'occasion' }] }],
      validation: (rule) => rule.unique(),
    },
    {
      name: 'styles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'style' }] }],
      validation: (rule) => rule.unique(),
    },

    {
      name: 'mainImage',
      type: 'image',
      options: { hotspot: true },
      fields: [alt()],
      validation: (rule) => rule.required(),
    },

    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },

    {
      name: 'variants',
      type: 'array',
      validation: (rule) => rule.required().unique(),
      description: 'The first variant in the list will be the default variant.',
      of: [
        {
          title: 'Variant',
          type: 'setVariant',
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'defaultSetVariant.images[0]',
    },
  },
});

export default set;
