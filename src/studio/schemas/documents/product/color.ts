import { orderRankField } from '@sanity/orderable-document-list';
import { defineType } from 'sanity';
import { IoIosColorFill } from 'react-icons/io';

const color = defineType({
  name: 'colour',
  icon: IoIosColorFill,
  type: 'document',
  fields: [
    orderRankField({ type: 'colour' }),

    {
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'color',
      type: 'color',
    },

    {
      name: 'value',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    },
  ],
});

export default color;
