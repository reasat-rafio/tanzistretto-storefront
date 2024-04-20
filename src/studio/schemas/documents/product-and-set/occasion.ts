import { orderRankField } from '@sanity/orderable-document-list';
import { defineType } from 'sanity';
import { LuPartyPopper } from 'react-icons/lu';

const occasion = defineType({
  name: 'occasion',
  icon: LuPartyPopper,
  type: 'document',
  fields: [
    orderRankField({ type: 'occasion' }),

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

export default occasion;
