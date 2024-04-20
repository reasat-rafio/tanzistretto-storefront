import { sanityClient } from '../../../../../lib/sanity/sanity-client';
import { alt } from '$studio/lib/alt';
import { orderRankField } from '@sanity/orderable-document-list';
import { MdCollectionsBookmark } from 'react-icons/md';
import { defineType } from 'sanity';
import ProductPreview from '$studio/components/ProductPreview';

const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: MdCollectionsBookmark,
  components: {
    preview: ProductPreview,
  },

  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    orderRankField({ type: 'collection' }),
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
      name: 'active',
      type: 'boolean',
      initialValue: true,
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
      },
    },
    {
      name: 'thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [alt()],
      validation: (rule) => rule.required(),
    },
    {
      name: 'subtitle',
      type: 'string',
    },

    {
      name: 'description',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },

    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },

    {
      name: 'sets',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'set' }] }],
      validation: (rule) => rule.required().unique(),
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'thumbnail',
      //   defaultColor: 'defaultProductVariant.color.name',
      //   variants: 'variants',
    },
  },
});

export default collection;
