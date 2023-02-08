import {GiLargeDress} from 'react-icons/gi'
import {TiFlowChildren} from 'react-icons/ti'
import {Rule} from 'sanity'

const Product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: GiLargeDress,
  fields: [
    {name: 'seo', type: 'seo', validation: (Rule: Rule) => Rule.required()},
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
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
      name: 'color',
      type: 'color',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Price Details',
      name: 'priceDetails',
      type: 'array',
      validation: (Rule: Rule) =>
        Rule.required().custom((item: {name: string; price: number; isDefault?: boolean}[]) => {
          const isDefaultArr = item.filter((e) => e.isDefault)
          if (isDefaultArr.length !== 1) return 'Please Select 1 item as default'
          return true
        }),
      of: [
        {
          name: 'individualPrice',
          title: 'individual Item Price',
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
            {name: 'isDefault', type: 'boolean'},
          ],
          preview: {
            select: {
              names: 'names',
              subtitle: 'price',
              isDefault: 'isDefault',
            },
            prepare({names, subtitle, isDefault}: any) {
              return {
                title: `${names.map((e: string) => e)}`,
                subtitle: isDefault ? `${subtitle} | default price` : subtitle,
                icon: TiFlowChildren,
              }
            },
          },
        },
      ],
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

    {
      name: 'variants',
      type: 'array',
      of: [
        {
          name: 'variant',
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
    },
    {
      name: 'tags',
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
      name: 'categories',
      validation: (Rule: Rule) => Rule.required(),
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'category'},
        },
      ],
    },
    {
      name: 'materials',
      validation: (Rule: Rule) => Rule.required(),
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'material'},
        },
      ],
    },
    {
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'body',
      media: 'images',
    },
    prepare: ({title, subtitle, media}: any) => ({title, subtitle, media: media[0]}),
  },
}

export default Product
