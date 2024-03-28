/* eslint-disable @typescript-eslint/no-explicit-any */
import { pages } from '$lib/utils/constant';
import { BsLink45Deg } from 'react-icons/bs';
import { defineType } from 'sanity';
import { alt } from '../../lib/alt';
import { CiImageOn } from 'react-icons/ci';

// @TODO - Hide the internal and external link when there is a child
const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: BsLink45Deg,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      type: 'string',
      initialValue: 'internal',
      hidden: ({ parent }) => !!parent?.subLinks?.length,
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' },
        ],
      },
    },
    {
      name: 'internalLink',
      type: 'string',
      hidden: ({ parent }) =>
        !!parent?.subLinks?.length || parent?.type !== 'internal',
      options: {
        list: [...pages],
      },
      validation: (Rule) =>
        Rule.custom((internalLink, context) => {
          const parent: any = context?.parent;
          if (parent?.subLinks?.length) return true;
          else if (parent?.type === 'internal' && !internalLink)
            return 'Internal link is required';
          else return true;
        }),
    },
    {
      name: 'externalLink',
      type: 'url',
      hidden: ({ parent }) =>
        !!parent?.subLinks?.length || parent?.type !== 'external',
      validation: (Rule) =>
        Rule.custom((externalLink, context) => {
          const parent: any = context?.parent;
          if (parent?.subLinks?.length) return true;
          else if (parent?.type === 'external' && !externalLink)
            return 'External link is required';
          else return true;
        }),
    },

    {
      type: 'array',
      name: 'subLinks',
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: 'object',
          name: 'links',
          icon: BsLink45Deg,
          fields: [
            {
              name: 'links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'link',
                  fields: [
                    {
                      name: 'title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'link',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'link',
                    },
                  },
                },
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'link',
                },
              },
            },
          ],
          preview: {
            select: {
              links: 'links',
            },
            prepare: ({ links }: any) => ({
              title: links.map((link: any) => link.title).join(', '),
            }),
          },
        },
        {
          type: 'object',
          name: 'poster',
          icon: CiImageOn,
          fields: [
            {
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            { name: 'subtitle', type: 'string' },
            {
              name: 'image',
              type: 'image',
              fields: [alt()],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'link',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
});

export default link;
