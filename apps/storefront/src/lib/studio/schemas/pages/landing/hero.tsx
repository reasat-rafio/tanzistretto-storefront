import { SiHomeadvisor } from 'react-icons/si';
import { toPlainText } from '@portabletext/svelte';
import { alt } from '$lib/studio/lib/alt';
import type { ObjectRule } from 'sanity';

const hero = {
  title: 'Hero',
  name: 'landing.hero',
  type: 'object',
  icon: SiHomeadvisor,
  fields: [
    {
      name: 'banners',
      type: 'array',
      of: [
        {
          name: 'banner',
          type: 'object',
          validation: (Rule: ObjectRule) => Rule.required(),
          fields: [
            {
              name: 'image',
              type: 'image',
              validation: (Rule: ObjectRule) => Rule.required(),
              options: { hotspot: true },
              fields: [alt()],
            },
            {
              name: 'title',
              type: 'text',
              rows: 2,
              validation: (Rule: ObjectRule) => Rule.required(),
            },

            {
              name: 'subtitle',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'link',
              type: 'link',
              validation: (Rule: ObjectRule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }: unknown) {
      return { title: toPlainText(title), subtitle };
    },
  },
};

export default hero;
