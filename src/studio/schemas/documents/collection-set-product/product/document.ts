import { sanityClient } from '$lib/sanity/sanity-client';
import { alt } from '$studio/lib/alt';
import { orderRankField } from '@sanity/orderable-document-list';
import { MdLocalDrink } from 'react-icons/md';
import { defineType } from 'sanity';
import ProductPreview from '$studio/components/ProductPreview';

const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: MdLocalDrink,
  components: {
    preview: ProductPreview,
  },

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
      group: 'content',
    },
    {
      name: 'outOfStock',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    },
    {
      name: 'new',
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
        group: 'content',
      },
    },
    {
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
      name: 'price',
      type: 'number',
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required().unique(),
    },
    {
      name: 'materials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'material' }] }],
      group: 'variants',
      validation: (rule) => rule.required().unique(),
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
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'defaultProductVariant.images[0]',
      defaultColor: 'defaultProductVariant.color.name',
      variants: 'variants',
    },
  },
});

export default product;
