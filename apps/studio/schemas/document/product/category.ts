import {BiCategoryAlt} from 'react-icons/bi'
import {Rule} from 'sanity'
const Category = {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: BiCategoryAlt,
  fields: [
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
      name: 'description',
      type: 'text',
    },
    {
      name: 'parents',
      title: 'Parent categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        },
      ],
    },
  ],
}

export default Category
