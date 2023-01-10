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
      name: 'sizes',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    },
    {
      title: 'Price Details',
      name: 'priceDetails',
      type: 'array',
      validation: (Rule: Rule) =>
        Rule.required().custom((item: {name: string; price: number; isFullSet?: boolean}[]) => {
          const fullsetArr = item.filter((e) => e.isFullSet)
          if (fullsetArr.length !== 1) return 'Please Select 1 item as fullset'
          return true
        }),
      of: [
        {
          name: 'individualPrice',
          title: 'individual Item Price',
          description: 'Options',
          type: 'object',
          icon: TiFlowChildren,
          fields: [
            {
              name: 'names',
              type: 'array',
              validation: (Rule: Rule) => Rule.required(),
              of: [
                {
                  type: 'string',
                },
              ],
              options: {
                layout: 'tags',
              },
            },
            {
              name: 'price',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
            {name: 'isFullSet', type: 'boolean'},
          ],
          preview: {
            select: {
              names: 'names',
              subtitle: 'price',
            },
            prepare({names, subtitle}: any) {
              return {
                title: JSON.stringify(names),
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
