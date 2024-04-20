import { orderRankField } from '@sanity/orderable-document-list';
import { defineType } from 'sanity';
import { IoIosResize } from 'react-icons/io';

const size = defineType({
  name: 'size',
  icon: IoIosResize,
  type: 'document',
  fields: [
    orderRankField({ type: 'size' }),

    {
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'value',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    },
  ],
});

export default size;
