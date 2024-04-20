import { orderRankField } from '@sanity/orderable-document-list';
import { defineType } from 'sanity';
import { SiStylelint } from 'react-icons/si';

const style = defineType({
  name: 'style',
  icon: SiStylelint,
  type: 'document',
  fields: [
    orderRankField({ type: 'style' }),

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

export default style;
