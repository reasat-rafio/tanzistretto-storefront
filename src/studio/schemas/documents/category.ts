import { orderRankField } from '@sanity/orderable-document-list';
import { BiCategoryAlt } from 'react-icons/bi';
import { defineType } from 'sanity';

const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: BiCategoryAlt,
  fields: [
    orderRankField({ type: 'category' }),

    {
      name: 'commonSoon',
      type: 'boolean',
      validation: (rule) => rule.required(),
      initialValue: false,
    },

    {
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'parents',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    },
  ],
});

export default category;
