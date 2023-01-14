import {FiStar} from 'react-icons/fi'
import {Rule} from 'sanity'

const HomePageHero = {
  name: 'homePage.hero',
  title: 'Hero',
  icon: FiStar,
  type: 'object',
  fields: [
    {
      name: 'highlights',
      type: 'array',
      of: [
        {
          name: 'highlight',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'array',
              validation: (Rule: Rule) => Rule.required().max(3),
              of: [{type: 'string'}],
            },
            {
              name: 'textColor',
              type: 'string',
              initialValue: 'dark',
              validation: (Rule: Rule) => Rule.required(),
              options: {
                list: [
                  {title: 'Dark', value: 'dark'},
                  {title: 'Light', value: 'light'},
                ],
              },
            },
            {name: 'cta', type: 'cta'},
            {
              name: 'image',
              type: 'image',
              validation: (Rule: Rule) => Rule.required(),
              options: {
                hotspot: true,
              },
              fields: [
                {
                  title: 'Alternative Text',
                  name: 'alt',
                  type: 'string',
                  validation: (Rule: Rule) =>
                    Rule.required().error('Please add an alternative text for the image'),
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
            prepare: ({title, media}: {[_key: string]: string}) => ({
              title: Array.from(title).join(','),
              media,
            }),
          },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Hero',
      icon: FiStar,
    }),
  },
}

export default HomePageHero
