import {GiLargeDress} from 'react-icons/gi'
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
      title: 'Default Variant',
      name: 'defaultProductVariant',
      type: 'productVariant',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'variants',
      type: 'array',
      of: [
        {
          title: 'Variant',
          type: 'productVariant',
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
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'body',
      media: 'defaultProductVariant.images.0',
    },
  },
}

export default Product
