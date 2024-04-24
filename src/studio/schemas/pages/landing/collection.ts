import { HiOutlineCollection } from 'react-icons/hi';
import { defineType } from 'sanity';

const collection = defineType({
  name: 'landing.collection',
  type: 'object',
  title: 'Collection',
  icon: HiOutlineCollection,
  fields: [
    {
      name: 'collection',
      type: 'reference',
      to: [{ type: 'collection' }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'collection.title',
      media: 'collection.thumbnail',
    },
  },
});

export default collection;
