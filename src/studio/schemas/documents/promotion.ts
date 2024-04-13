import { TfiAnnouncement } from 'react-icons/tfi';
import type { ObjectRule } from 'sanity';
import { orderRankField } from '@sanity/orderable-document-list';

const promotion = {
  name: 'promotion',
  type: 'document',
  icon: TfiAnnouncement,
  fields: [
    orderRankField({ type: 'promotion' }),
    {
      name: 'title',
      type: 'array',
      of: [{ type: 'block', styles: [], lists: [] }],
      validation: (Rule: ObjectRule) => Rule.required(),
    },
  ],
};

export default promotion;
