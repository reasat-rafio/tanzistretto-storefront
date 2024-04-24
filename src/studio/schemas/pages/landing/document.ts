import { defineField, defineType } from 'sanity';

const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      options: {
        collapsable: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'sections',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [{ type: 'landing.hero' }, { type: 'landing.collection' }],
    }),
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
    },
  },
});

export default landingPage;
