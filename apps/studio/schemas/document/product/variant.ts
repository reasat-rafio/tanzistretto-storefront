import {Rule} from 'sanity'
import {VscTypeHierarchySub} from 'react-icons/vsc'
import {TiFlowChildren} from 'react-icons/ti'

const ProductVariant = {
  title: 'Product variant',
  name: 'productVariant',
  type: 'object',
  icon: VscTypeHierarchySub,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'fullSetPrice',
      type: 'number',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'individualPrices',
      title: 'individual Item Prices',
      type: 'array',
      of: [
        {
          name: 'individualPrice',
          title: 'individual Item Price',
          description: 'Options',
          type: 'object',
          icon: TiFlowChildren,
          fields: [
            {
              name: 'name',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'price',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
            },
            prepare({title, subtitle}: any) {
              return {
                title,
                subtitle,
                icon: TiFlowChildren,
              }
            },
          },
        },
      ],
    },

    {
      name: 'color',
      type: 'color',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'images',
      validation: (Rule: Rule) => Rule.required(),
      type: 'array',
      of: [
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
            {
              title: 'Caption',
              name: 'caption',
              type: 'string',
              description: 'Optional',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'images[0]',
    },
  },
}

export default ProductVariant
