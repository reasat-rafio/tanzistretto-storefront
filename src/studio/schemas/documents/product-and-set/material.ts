import { orderRankField } from '@sanity/orderable-document-list';
import { defineType } from 'sanity';
import { SlChemistry } from 'react-icons/sl';

const material = defineType({
  name: 'material',
  icon: SlChemistry,
  type: 'document',
  fields: [
    orderRankField({ type: 'material' }),

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

export default material;
